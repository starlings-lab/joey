'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Title } from '@tremor/react';
import Image from 'next/image';
import Link from 'next/link';
import Joey from './assets/joey.svg'

const navigation = [
  { name: '', href: '/' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      <Image width="32" height="32" src={Joey} alt="" />
                      <Title className='text-2xl font-bold ml-1'>{item.name}</Title>
                    </a>
                  ))}
              </div>
              <div className="mt-auto mb-auto">
                <button className="bg-pink-600 hover:bg-pink-400 text-white py-2 px-4 rounded"><Link target="_blank" href="https://t.me/+WN0vHN-RU2g1ZTkx">Talk to Us!</Link></button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
