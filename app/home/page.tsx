// app/page.tsx

"use client"; // Marking this component as a client component

import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Adjust the import path based on your setup

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            {/* Header Section */}
            <header className="w-full p-4 bg-blue-600 text-white flex justify-between items-center">
                <h1 className="text-2xl font-bold">Useless Gadget</h1>
                <Button variant="outline" className="text-white">Login</Button>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center space-y-8 mt-8 w-full">

                {/* Section 1 - Full Width with Max Width */}
                <section className="flex items-start bg-white shadow-md rounded-lg p-4 w-full max-w-[calc(100%-2rem)]"> 
                    <Image src="/path/to/image1.jpg" alt="Image 1" width={150} height={150} className="mr-4" />
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">Section 1 Title</h2>
                        <p>This is some description text for section 1.</p>
                        <Button className="mt-2">Learn More</Button>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="flex items-start bg-white shadow-md rounded-lg p-4 w-full max-w-[calc(100%-2rem)]">
                    <Image src="/path/to/image2.jpg" alt="Image 2" width={150} height={150} className="mr-4" />
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">Section 2 Title</h2>
                        <p>This is some description text for section 2.</p>
                        <Button className="mt-2">Learn More</Button>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="flex items-start bg-white shadow-md rounded-lg p-4 w-full max-w-[calc(100%-2rem)]">
                    <Image src="/path/to/image3.jpg" alt="Image 3" width={150} height={150} className="mr-4" />
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">Section 3 Title</h2>
                        <p>This is some description text for section 3.</p>
                        <Button className="mt-2">Learn More</Button>
                    </div>
                </section>

            </main>
        </div>
    );
}