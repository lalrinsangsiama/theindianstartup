'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Command, Search, X, BookOpen, MessageSquare, FileText, Loader2, ArrowRight, Keyboard } from 'lucide-react';
import { Text } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

interface SearchResult {
  id: string;
  type: 'course' | 'lesson' | 'community' | 'resource';
  title: string;
  description: string;
  url: string;
  highlight?: string;
  metadata?: Record<string, unknown>;
}

const typeIcons = {
  course: BookOpen,
  lesson: FileText,
  community: MessageSquare,
  resource: FileText,
};

const typeLabels = {
  course: 'Course',
  lesson: 'Lesson',
  community: 'Community',
  resource: 'Resource',
};

const typeColors = {
  course: 'bg-blue-100 text-blue-700',
  lesson: 'bg-green-100 text-green-700',
  community: 'bg-purple-100 text-purple-700',
  resource: 'bg-amber-100 text-amber-700',
};

export function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Open search with Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search with debounce
  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`);
      const data = await res.json();
      setResults(data.results || []);
      setSelectedIndex(0);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle query change with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      search(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, search]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateTo(results[selectedIndex].url);
    }
  };

  const navigateTo = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  // Highlight matching text
  const highlightText = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white border rounded">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Dialog */}
      <div className="fixed inset-x-4 top-[20%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl z-50">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search courses, lessons, community..."
              className="flex-1 text-lg outline-none placeholder:text-gray-400"
            />
            {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.length < 2 ? (
              <div className="p-8 text-center">
                <Keyboard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <Text color="muted">
                  Type at least 2 characters to search
                </Text>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span><kbd className="px-1 py-0.5 bg-gray-100 rounded">↑↓</kbd> Navigate</span>
                  <span><kbd className="px-1 py-0.5 bg-gray-100 rounded">↵</kbd> Select</span>
                  <span><kbd className="px-1 py-0.5 bg-gray-100 rounded">Esc</kbd> Close</span>
                </div>
              </div>
            ) : results.length === 0 && !loading ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <Text color="muted">
                  No results found for "{query}"
                </Text>
                <Text size="sm" color="muted" className="mt-2">
                  Try different keywords or check your spelling
                </Text>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => navigateTo(result.url)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                        selectedIndex === index
                          ? 'bg-gray-100'
                          : 'hover:bg-gray-50'
                      )}
                    >
                      <div className={cn('p-2 rounded-lg', typeColors[result.type])}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Text weight="medium" className="truncate">
                            {highlightText(result.title)}
                          </Text>
                          <span className={cn(
                            'text-xs px-1.5 py-0.5 rounded',
                            typeColors[result.type]
                          )}>
                            {typeLabels[result.type]}
                          </span>
                        </div>
                        {result.highlight && (
                          <Text size="sm" color="muted" className="line-clamp-1 mt-0.5">
                            {highlightText(result.highlight)}
                          </Text>
                        )}
                      </div>
                      {selectedIndex === index && (
                        <ArrowRight className="w-4 h-4 text-gray-400 self-center" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="px-4 py-2 border-t bg-gray-50 flex items-center justify-between text-xs text-gray-500">
              <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
              <div className="flex items-center gap-3">
                <span><kbd className="px-1 py-0.5 bg-white border rounded">↵</kbd> to open</span>
                <span><kbd className="px-1 py-0.5 bg-white border rounded">Esc</kbd> to close</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
