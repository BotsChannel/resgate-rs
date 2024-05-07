"use client";
import Link from "next/link";
import Image from "next/image";
import { InstagramOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-zinc-200 text-center lg:text-left px-8 pt-4">
      <div className="flex flex-row items-center justify-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:justify-between py-4">
        <hr className="w-full border-neutral-400 mt-2 lg:hidden" />
        <div className="mb-4 text-neutral-900 flex items-center flex-col justify-center">
          <Link
            className="flex gap-1 items-center hover:text-blue-500"
            href="https://www.instagram.com/bots.ch/"
          >
            <div className="flex flex-col items-center justify-center">
              <Image
                src="https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/botschannel_logo.png"
                alt="BotsChannel"
                width={100}
                height={100}
              />
              <div className="flex flex-row items-center justify-center mt-4">
                <InstagramOutlined className="text-blue-500" />
                <p className="mb-0.5 pl-1 font-bold text-xl">Bots Channel</p>
              </div>
            </div>
          </Link>
        </div>
        <hr className="w-full border-neutral-400 lg:hidden" />
        <div className="text-neutral-900 flex items-center flex-col justify-center">
          <div className="flex flex-col items-center justify-center mb-2">
            <Image
              src="https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/qrcode.jpeg"
              alt="QR Code"
              width={150}
              height={150}
            />
          </div>
        </div>
        <hr className="w-full border-neutral-400 mt-2 lg:hidden" />
        <div className="flex items-center text-neutral-700 flex-col justify-start">
          <h3 className="text-xl font-bold mb-4">Desenvolvedores</h3>
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 mb-4">
            <Link
              className="flex gap-1 items-center hover:text-blue-500"
              href="https://www.instagram.com/lucasdinizostroski/"
            >
              <InstagramOutlined className="text-blue-500" />
              <span className="ml-1">Lucas Diniz</span>
            </Link>
            <Link
              className="flex gap-1 items-center hover:text-blue-500"
              href="https://www.instagram.com/soaresgabe/"
            >
              <InstagramOutlined className="text-blue-500" />
              <span className="ml-1">Gabriel Soares</span>
            </Link>
          </div>
        <hr className="w-full border-neutral-400 mt-2 lg:hidden" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
