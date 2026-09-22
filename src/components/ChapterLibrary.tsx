import React, { useState } from 'react';
import { MangaChapter } from '../types';
import { BookOpen, Plus, Edit2, Check, X, Layers, Clock, AlertCircle } from 'lucide-react';

interface ChapterLibraryProps {
  chapters: MangaChapter[];
  onSelectChapter: (chapterId: string) => void;
  onUpdateChapterTitle: (chapterId: string, newTitle: string, subtitle?: string) => void;
  onAddNewChapter: (title: string, subtitle?: string) => void;
  isDarkMode: boolean;
}

export const ChapterLibrary: React.FC<ChapterLibraryProps> = ({
  chapters,
  onSelectChapter,
  onUpdateChapterTitle,
  onAddNewChapter,
  isDarkMode,
}) => {
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');

  // New chapter form modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [newChapterSubtitle, setNewChapterSubtitle] = useState('');

  const startEdit = (ch: MangaChapter) => {
    setEditingChapterId(ch.id);
    setEditTitle(ch.title);
    setEditSubtitle(ch.subtitle || '');
  };

  const saveEdit = (chId: string) => {
    if (editTitle.trim()) {
      onUpdateChapterTitle(chId, editTitle.trim(), editSubtitle.trim());
    }
    setEditingChapterId(null);
  };

  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterTitle.trim()) return;
    onAddNewChapter(newChapterTitle.trim(), newChapterSubtitle.trim());
    setNewChapterTitle('');
    setNewChapterSubtitle('');
    setShowAddModal(false);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto" id="chapters-section">
      {/* Section Header */}
      <div className="border-b-2 border-current pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHIVE & CHAPTER INDEX</span>
          </div>
          <h2 className="font-manga-title text-4xl sm:text-5xl font-black uppercase tracking-tight">
            CHAPTER LIBRARY
          </h2>
          <p className="font-sans-body text-sm text-neutral-400 mt-1 max-w-xl">
            Official chapters for <em>Xploration of Powers (力の探求)</em>. Only confirmed, existing chapters are listed. Future chapters appear once added by the creator.
          </p>
        </div>

        {/* Add Chapter Button */}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className={`px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider border-2 flex items-center gap-1.5 transition-all self-start sm:self-auto ${
            isDarkMode
              ? 'border-neutral-200 bg-neutral-100 text-black hover:bg-neutral-300'
              : 'border-black bg-black text-white hover:bg-neutral-800'
          }`}
          id="btn-add-chapter-trigger"
        >
          <Plus className="w-4 h-4" />
          <span>Add Future Chapter</span>
        </button>
      </div>

      {/* Chapters List */}
      <div className="space-y-4" id="chapters-list">
        {chapters.map((ch) => {
          const isEditing = editingChapterId === ch.id;

          return (
            <div
              key={ch.id}
              className={`border-2 p-5 sm:p-6 transition-all ${
                isDarkMode
                  ? 'border-neutral-800 bg-neutral-950/80 hover:border-neutral-700'
                  : 'border-neutral-300 bg-white hover:border-black'
              } relative group`}
              id={`chapter-card-${ch.number}`}
            >
              {isEditing ? (
                /* Editable Chapter Form */
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1">CHAPTER TITLE</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 bg-neutral-900 border border-neutral-700 text-white font-mono text-sm"
                      placeholder="e.g. The Awakening"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">OPTIONAL SUBTITLE / KANJI</label>
                    <input
                      type="text"
                      value={editSubtitle}
                      onChange={(e) => setEditSubtitle(e.target.value)}
                      className="w-full p-2 bg-neutral-900 border border-neutral-700 text-white font-mono text-sm"
                      placeholder="e.g. 始まりの刻"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => saveEdit(ch.id)}
                      className="px-3 py-1.5 bg-white text-black font-bold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingChapterId(null)}
                      className="px-3 py-1.5 border border-neutral-700 text-neutral-400 flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Standard Chapter Display */
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Chapter Number Emblem */}
                    <div
                      className={`w-14 h-14 shrink-0 border-2 flex flex-col items-center justify-center font-mono ${
                        isDarkMode
                          ? 'border-neutral-700 bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-neutral-100 text-black'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500">
                        CH.
                      </span>
                      <span className="text-xl font-black font-manga-title leading-none">
                        {ch.number.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Chapter Details */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono tracking-widest uppercase font-bold text-neutral-400">
                          CHAPTER {ch.number.toString().padStart(2, '0')}
                        </span>
                        <span className="text-neutral-600">•</span>
                        <span className="text-xs font-mono text-neutral-400">
                          {ch.pages.length} Pages
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.2 border uppercase ${
                            ch.isAvailable
                              ? 'border-green-600/60 text-green-400 bg-green-950/20'
                              : 'border-neutral-700 text-neutral-400'
                          }`}
                        >
                          {ch.isAvailable ? 'AVAILABLE NOW' : 'COMING SOON'}
                        </span>
                      </div>

                      <h3 className="font-manga-title text-2xl sm:text-3xl font-black tracking-wide mt-1">
                        {ch.title}
                      </h3>

                      {ch.subtitle && (
                        <p className="font-japanese text-sm text-neutral-400 mt-0.5">
                          {ch.subtitle}
                        </p>
                      )}

                      {ch.releaseNote && (
                        <p className="font-sans-body text-xs text-neutral-500 mt-1">
                          {ch.releaseNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => startEdit(ch)}
                      className="p-2 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 text-xs font-mono transition-colors"
                      title="Edit chapter title"
                      id={`btn-edit-chapter-${ch.number}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectChapter(ch.id)}
                      className={`px-5 py-2.5 text-xs font-mono uppercase font-bold tracking-wider border-2 flex items-center gap-2 transition-all ${
                        isDarkMode
                          ? 'border-white bg-white text-black hover:bg-neutral-200'
                          : 'border-black bg-black text-white hover:bg-neutral-800'
                      }`}
                      id={`btn-read-chapter-${ch.number}`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Chapter</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: Add New Chapter */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          id="modal-add-chapter"
        >
          <div className="w-full max-w-md bg-neutral-950 border-2 border-white text-white p-6 font-mono text-xs">
            <h3 className="font-manga-title text-2xl font-bold uppercase mb-1">
              ADD FUTURE CHAPTER
            </h3>
            <p className="text-neutral-400 font-sans-body text-xs mb-4">
              Add upcoming chapter titles (e.g. Chapter 02, Chapter 03, Chapter 04). The chapter will be created with draft placeholder pages ready for your artwork.
            </p>

            <form onSubmit={handleCreateChapter} className="space-y-4">
              <div>
                <label className="block text-neutral-300 font-bold mb-1">
                  CHAPTER NUMBER
                </label>
                <div className="p-2.5 bg-neutral-900 border border-neutral-700 text-neutral-400">
                  Chapter {(chapters.length + 1).toString().padStart(2, '0')}
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1">
                  CHAPTER TITLE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clash of Intent"
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-700 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1">
                  OPTIONAL SUBTITLE / KANJI
                </label>
                <input
                  type="text"
                  placeholder="e.g. 意志の衝突"
                  value={newChapterSubtitle}
                  onChange={(e) => setNewChapterSubtitle(e.target.value)}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-700 text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-neutral-700 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200"
                >
                  Create Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
