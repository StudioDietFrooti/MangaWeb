import math
import struct
import wave
import subprocess

SAMPLE_RATE = 44100
BPM = 140
BEAT_LEN = 60.0 / BPM  # seconds per beat (~0.42857s)
TOTAL_BARS = 8
BEATS_PER_BAR = 4
TOTAL_BEATS = TOTAL_BARS * BEATS_PER_BAR
DURATION = TOTAL_BEATS * BEAT_LEN  # ~13.71 seconds, loops cleanly
NUM_SAMPLES = int(SAMPLE_RATE * DURATION)

# Chord progression in E minor: Em, C, G, D (2 bars each)
CHORDS = [
    # Em (E3, G3, B3, E4) -> root 164.81 Hz
    {"root": 164.81, "notes": [164.81, 196.00, 246.94, 329.63], "bass": 82.41},
    # C (C3, E3, G3, C4) -> root 130.81 Hz
    {"root": 130.81, "notes": [130.81, 164.81, 196.00, 261.63], "bass": 65.41},
    # G (G3, B3, D4, G4) -> root 196.00 Hz
    {"root": 196.00, "notes": [196.00, 246.94, 293.66, 392.00], "bass": 98.00},
    # D (D3, F#3, A3, D4) -> root 146.83 Hz
    {"root": 146.83, "notes": [146.83, 185.00, 220.00, 293.66], "bass": 73.42},
]

# Melody note sequence (in E minor / pentatonic) for lead synth:
MELODY = [
    # Bar 1-2 (Em): E5, G5, B5, A5, G5, E5, D5, E5
    659.25, 783.99, 987.77, 880.00, 783.99, 659.25, 587.33, 659.25,
    # Bar 3-4 (C): G5, A5, B5, D6, B5, A5, G5, E5
    783.99, 880.00, 987.77, 1174.66, 987.77, 880.00, 783.99, 659.25,
    # Bar 5-6 (G): D6, B5, G5, A5, B5, D6, E6, D6
    1174.66, 987.77, 783.99, 880.00, 987.77, 1174.66, 1318.51, 1174.66,
    # Bar 7-8 (D): F#5, A5, D6, F#6, E6, D6, B5, A5
    739.99, 880.00, 1174.66, 1479.98, 1318.51, 1174.66, 987.77, 880.00,
]

def generate_track():
    left_channel = [0.0] * NUM_SAMPLES
    right_channel = [0.0] * NUM_SAMPLES

    for i in range(NUM_SAMPLES):
        t = i / SAMPLE_RATE
        beat_idx = t / BEAT_LEN
        bar_idx = int(beat_idx / BEATS_PER_BAR) % TOTAL_BARS
        chord_idx = (bar_idx // 2) % len(CHORDS)
        chord = CHORDS[chord_idx]

        # 1. Kick Drum: beats 0, 1, 2, 3 (on every beat or 1 & 3)
        beat_phase = beat_idx % 1.0
        kick = 0.0
        if beat_phase < 0.25:
            # Pitch drop from 120Hz to 45Hz
            kick_env = math.exp(-beat_phase * 18.0)
            kick_freq = 45.0 + 80.0 * kick_env
            kick = 0.45 * math.sin(2.0 * math.pi * kick_freq * (beat_phase * BEAT_LEN)) * kick_env

        # 2. Snare: beats 1 and 3 (in 0-indexed: 1 and 3)
        beat_in_bar = int(beat_idx) % 4
        snare = 0.0
        if beat_in_bar in (1, 3) and beat_phase < 0.3:
            snare_env = math.exp(-beat_phase * 14.0)
            # Pseudo-noise + body tone (180Hz)
            noise = ((i * 1103515245 + 12345) & 0x7FFFFFFF) / 0x7FFFFFFF * 2.0 - 1.0
            body = math.sin(2.0 * math.pi * 180.0 * (beat_phase * BEAT_LEN))
            snare = 0.35 * (0.6 * noise + 0.4 * body) * snare_env

        # 3. Hi-Hat: 8th notes (every 0.5 beat)
        sub_beat = (beat_idx * 2) % 1.0
        hihat = 0.0
        if sub_beat < 0.15:
            hh_env = math.exp(-sub_beat * 35.0)
            noise = ((i * 1664525 + 1013904223) & 0x7FFFFFFF) / 0x7FFFFFFF * 2.0 - 1.0
            hihat = 0.12 * noise * hh_env

        # 4. Bassline: 8th note driving groove
        bass_phase = (beat_idx * 2) % 1.0
        bass_env = math.exp(-bass_phase * 3.5)
        bass_freq = chord["bass"]
        # Sawtooth-like bass
        bass = 0.0
        for h in range(1, 4):
            bass += (1.0 / h) * math.sin(2.0 * math.pi * (bass_freq * h) * t)
        bass = 0.28 * bass * (0.7 + 0.3 * bass_env)

        # 5. Rhythm Power Chords (overdriven pad)
        pad = 0.0
        for n_freq in chord["notes"]:
            # Blend fundamental + slight harmonic
            tone = math.sin(2.0 * math.pi * n_freq * t) + 0.3 * math.sin(2.0 * math.pi * n_freq * 2 * t)
            # Soft saturation
            tone = math.tanh(tone * 1.5)
            pad += tone
        pad = 0.16 * (pad / len(chord["notes"]))

        # 6. Lead Synth Melody
        melody_note_idx = int(beat_idx * 2) % len(MELODY)
        lead_freq = MELODY[melody_note_idx]
        note_sub_phase = (beat_idx * 2) % 1.0
        lead_env = math.exp(-note_sub_phase * 2.0)
        # Bright square/saw hybrid lead
        lead = math.sin(2.0 * math.pi * lead_freq * t)
        lead += 0.5 * math.sin(2.0 * math.pi * lead_freq * 2 * t)
        lead += 0.25 * math.sin(2.0 * math.pi * lead_freq * 3 * t)
        lead = 0.18 * lead * lead_env

        # Master mix with gentle stereo panning
        mono_drums = kick + snare + hihat
        left_val = mono_drums + bass * 0.9 + pad * 0.8 + lead * 0.7
        right_val = mono_drums + bass * 0.9 + pad * 0.8 + lead * 0.9

        # Master soft clip limiter to prevent distortion
        left_channel[i] = math.tanh(left_val * 0.8)
        right_channel[i] = math.tanh(right_val * 0.8)

    # Save to WAV
    wav_path = "/tmp/bgm_loop.wav"
    with wave.open(wav_path, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        frames = bytearray()
        for i in range(NUM_SAMPLES):
            l_int = max(-32767, min(32767, int(left_channel[i] * 28000)))
            r_int = max(-32767, min(32767, int(right_channel[i] * 28000)))
            frames.extend(struct.pack("<hh", l_int, r_int))
        wf.writeframes(frames)
    print("WAV generated:", wav_path)

    # Encode to MP3 with ffmpeg into public/assets/theme.mp3 and public/assets/bgm.mp3
    mp3_paths = [
        "/app/applet/public/assets/theme.mp3",
        "/app/applet/public/assets/bgm.mp3",
        "/app/applet/public/theme.mp3",
    ]
    for out in mp3_paths:
        cmd = ["ffmpeg", "-y", "-i", wav_path, "-codec:a", "libmp3lame", "-b:a", "192k", out]
        subprocess.run(cmd, check=True)
        print("MP3 created at:", out)

if __name__ == "__main__":
    generate_track()
