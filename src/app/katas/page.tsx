'use client';

import React from 'react';
import KataList from '../components/KataList';
import { useState } from 'react';
import Wrapper from '../components/Wrapper';

type category = 'Arrays and Objects' | 'Strings' | 'Maths' | 'Fun' | 'all';
type difficulty = 'Easy' | 'Moderate' | 'Hard' | 'Fiendish' | 'all';

export default function katas() {
  function selectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    const category = e.target.value as category;
    setCategory(category);
  }

  function selectDifficulty(e: React.ChangeEvent<HTMLSelectElement>) {
    const difficulty = e.target.value as difficulty;
    setDifficulty(difficulty);
  }

  const [difficulty, setDifficulty] = useState<difficulty>('all');
  const [category, setCategory] = useState<category>('all');

  return (
    <>
      <div className='mx-auto max-w-screen-xl'>
        <Wrapper>
          <h1 className='my-7 text-3xl font-bold'>List of Katas</h1>
          <div className='flex flex-row gap-3 rounded-t-lg bg-grey-300 px-4 pt-4'>
            <label className='flex flex-col'>
              <span className='mb-1 text-xs text-grey-150'>Difficulty</span>
              <select
                className='cursor-pointer rounded-lg border border-grey-200 bg-transparent p-2 text-sm hover:bg-grey-200'
                name='difficulty'
                id='difficulty'
                onChange={(e) => {
                  selectDifficulty(e);
                }}>
                <option value='all'>All</option>
                <option value='Easy'>Easy</option>
                <option value='Moderate'>Moderate</option>
                <option value='Hard'>Hard</option>
                <option value='Fiendish'>Fiendish</option>
              </select>
            </label>

            <label className='flex flex-col'>
              <span className='mb-1 text-xs text-grey-150'>Category</span>
              <select
                className='cursor-pointer rounded-lg border border-grey-200 bg-transparent p-2 text-sm hover:bg-grey-200'
                name='category'
                id='category'
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  selectCategory(e);
                }}>
                <option value='all'>All</option>
                <option value='Maths'>Maths</option>
                <option value='Arrays and Objects'>Arrays and Objects</option>
                <option value='Strings'>Strings</option>
                <option value='Fun'>Fun</option>
              </select>
            </label>
          </div>
          <ul className='flex flex-col gap-3 rounded-b-lg bg-grey-300 p-5'>
            <KataList difficulty={difficulty} category={category} />
          </ul>
        </Wrapper>
      </div>
    </>
  );
}
