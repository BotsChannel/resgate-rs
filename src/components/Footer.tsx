"use client";
import Link from "next/link";
import { InstagramOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-zinc-200 text-center lg:text-left p-8">
      <div className="flex flex-col items-center justify-center space-y-4 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-4">
        <div className="text-neutral-900 text-lg">
          <h3 className="text-xl font-bold mb-4">Informações de apoio</h3>
          <div className="flex items-center flex-row space-x-4 lg:items-start">
            <div className="space-y-2">
              <p className="font-semibold">Resgate bombeiros</p>
              <Link
                className="text-blue-500 hover:underline font-semibold transition-all"
                target="_blank"
                href={`https://api.whatsapp.com/send/?phone=${51984026119}&text&type=phone_number&app_absent=0`}
              >
                (51) 98402-6119
              </Link>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Resgate Helicóptero</p>
              <Link
                className="text-blue-500 hover:underline font-semibold transition-all"
                target="_blank"
                href={`https://api.whatsapp.com/send/?phone=${51984012527}&text&type=phone_number&app_absent=0`}
              >
                (51) 98401-2527
              </Link>
            </div>
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
        </div>
      </div>
      <hr className="w-full border-neutral-400 mt-2" />
    </footer>
  );
};

export default Footer;
