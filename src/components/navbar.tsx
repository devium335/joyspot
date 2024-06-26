import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModeToggle } from "@/src/components/mode-toggle";
import { buttonVariants } from "@/src/components/ui/button";
import { LanguagePicker } from "@/src/components/language-switcher";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

type Props = {};

const Navbar = async (props: Props) => {
	const t = useTranslations("Navbar");
	const user = await currentUser();
	const locale = cookies().get("NEXT_LOCALE")?.value || "en";

	return (
		<header className="fixed right-0 left-0 top-0 py-4 px-4 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
			<nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
				<ul className="flex items-center gap-4 list-none text-black dark:text-white">
					<li>
						<Link
							className={buttonVariants({ variant: "outline" })}
							href={`/${locale}/posts`}
						>
							{t("home")}
						</Link>
					</li>
				</ul>
			</nav>
			<ModeToggle />
			<div className="flex items-center gap-4">
				<LanguagePicker />
				{user ? <UserButton afterSignOutUrl="/" /> : null}
			</div>
		</header>
	);
};

export default Navbar;
