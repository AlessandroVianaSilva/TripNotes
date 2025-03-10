
'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function ThemeToggle({ isDropDown = false }: { isDropDown?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (isDropDown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="inline-flex items-center mb-2 px-2 h-9 gap-2 w-full justify-start whitespace-nowrap rounded-md shadow-sm text-sm font-base transition-colors disabled:pointer-events-none disabled:opacity-50  focus:outline-none dark:hover:bg-neutral-900 hover:bg-white"
          >
            <Sun
              className={cn(
                'h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ',
              )}
            />
            <Moon
              className={cn(
                'absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme('light')}
          >
            Claro
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme('dark')}
          >
            Escuro
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <>
      <div className="flex flex-row space-x-2 items-center rounded-full border p-1">
        <button
          className={cn(
            theme === 'light'
              ? 'bg-neutral-200 rounded-full'
              : 'bg-transparent',
            'p-1',
          )}
          onClick={() => setTheme('light')}
        >
          <Sun size={18} className="stroke-1" />
        </button>

        <button
          className={cn(
            theme === 'dark' ? 'bg-neutral-900 rounded-full' : 'bg-transparent',
            'p-1',
          )}
          onClick={() => setTheme('dark')}
        >
          <Moon size={18} className="stroke-1" />
        </button>
      </div>
    </>
  );
}