import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Clipboard, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { CodeViewDraw } from '../types';

type codeViewProps = {
	titleButton: string,
	codeView: CodeViewDraw[]
}
export const CodeViewerDrawer = ({ codeView, titleButton }: codeViewProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [copied, setCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(codeView[currentIndex].code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const nextCode = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % codeView.length);
	};

	const prevCode = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + codeView.length) % codeView.length);
	};

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">{titleButton}</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-full">
					<DrawerHeader>
						<DrawerTitle>Language {codeView[currentIndex].language}</DrawerTitle>
						<DrawerDescription>{codeView[currentIndex]?.description}</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div className="flex justify-between items-center mb-2">
							<Button variant="ghost" size="icon" onClick={prevCode}>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<span className="font-medium uppercase">{codeView[currentIndex].title}</span>
							<Button variant="ghost" size="icon" onClick={nextCode}>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
						<div className="relative">
							<pre className="bg-secondary px-6 py-4 rounded-md overflow-x-auto">
									<code className='text-fuchsia-400'>{codeView[currentIndex].code}</code>
							</pre>
							<Button
								className="absolute top-2 right-2"
								size="icon"
								variant="outline"
								onClick={copyToClipboard}
							>
								{copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
							</Button>
						</div>
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}