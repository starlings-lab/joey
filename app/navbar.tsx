'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Text, Title } from '@tremor/react';
import Image from 'next/image';
// import joeyImage from './Favicon.ico'

const navigation = [
  { name: 'Joey', href: '/' }
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
          <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
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
                      {/* <Image width="35" height="35" src={joeyImage} alt="" /> */}
                      <Title className='text-2xl font-bold ml-1'>{item.name}</Title>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
