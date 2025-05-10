import {
    IconBrandFacebook,
    IconBrandTwitter,
    IconBrandInstagram,
    IconBrandGithub,
} from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import Bioway_Logo from "@/assets/Bioway_Logo.png";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            <Card className="bg-gray-900 border-none rounded-none">
                <CardContent className="max-w-6xl mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
                    {/* Logo and Address */}
                    <div className="">
                        <img src={Bioway_Logo} alt="Bioway Logo" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2" >Addres</h3>
                        <p className="text-sm">
                            1234 Innovation Street<br />
                            Business City, 56789<br />
                            Indonesia
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contact</h3>
                        <p className="text-sm">Email: hello@clientcompany.com</p>
                        <p className="text-sm">Phone: +62 812 3456 7890</p>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                        <div className="flex gap-4 text-white">
                            <a href="https://facebook.com" aria-label="Facebook"><IconBrandFacebook size={24} /></a>
                            <a href="https://twitter.com" aria-label="Twitter"><IconBrandTwitter size={24} /></a>
                            <a href="https://instagram.com" aria-label="Instagram"><IconBrandInstagram size={24} /></a>
                        </div>
                    </div>
                </CardContent>

                <div className="border-t border-gray-700 pt-4 px-4 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Bioway. All rights reserved.</p>
                    <p className="mt-1">
                        Website crafted by
                        Stardust Studios
                    </p>
                </div>
            </Card>
        </footer>
    );
}
