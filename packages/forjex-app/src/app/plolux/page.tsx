"use client";

import React from "react";
import Image from "next/image";

// Assets from Figma context
// Note: These URLs are served by the local MCP server and require it to be running.
const imgIcon = "http://localhost:3845/assets/4c5e86ba8b06218153c3cbb508cf947d1dc1b3e9.svg"; // Likely Feature Icon
const imgIcon1 = "http://localhost:3845/assets/6899f559d1e7caf22aeaa3db7ee4f8d090150d78.svg";
const imgIcon2 = "http://localhost:3845/assets/b6043fea5da9859db36d1feee8c1ec72461db0d0.svg";
const imgIcon3 = "http://localhost:3845/assets/0844ab16fa112afd4931320e44c840edad1f7709.svg";
const imgVector8 = "http://localhost:3845/assets/01115627dc85ee593d89b7c85f1883586e334b02.svg"; // Moon Icon

export default function FloluxPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Header */}
            <header className="sticky top-0 z-50 flex h-[68px] items-center justify-between border-b border-slate-100 bg-white/90 px-6 backdrop-blur-md lg:px-20">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight text-[#00A3FF]">PLOLUX</span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
                    <a href="#" className="text-blue-500 transition hover:text-blue-600">홈</a>
                    <a href="#" className="transition hover:text-blue-500">회사소개</a>
                    <a href="#" className="transition hover:text-blue-500">블로그</a>
                    <a href="#" className="transition hover:text-blue-500">공지사항</a>
                    <a href="#" className="transition hover:text-blue-500">제작 요청</a>
                    <a href="#" className="transition hover:text-blue-500">문의하기</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="rounded-full p-2 transition hover:bg-slate-100">
                        <img src={imgVector8} alt="Theme" className="h-5 w-5 opacity-70" />
                    </button>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative flex flex-col items-center justify-center bg-[#050A18] px-6 py-32 text-center text-white lg:py-48">
                    <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl">
                        AI로 만드는<br />
                        <span className="bg-gradient-to-r from-[#00A3FF] to-[#00F0FF] bg-clip-text text-transparent">미래의 웹</span>
                    </h1>
                    <p className="mb-10 text-lg font-light text-slate-400 lg:text-xl">
                        PLOLUX와 함께 차세대 웹 경험을 구축하세요
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button className="rounded-full bg-[#00A3FF] px-8 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#0082CC]">
                            사이트 제작 요청
                        </button>
                        <button className="rounded-full border border-slate-600 px-8 py-3.5 text-[15px] font-medium text-white transition hover:bg-white/10">
                            문의하기
                        </button>
                    </div>

                    {/* Mouse Scroll Indicator Placeholder */}
                    <div className="absolute bottom-12 animate-bounce opacity-50">
                        <div className="h-10 w-6 rounded-full border-2 border-slate-500 p-1">
                            <div className="h-2 w-full rounded-full bg-slate-500"></div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white px-6 py-24 lg:px-20 lg:py-32">
                    <div className="mb-20 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">왜 PLOLUX인가?</h2>
                        <p className="text-slate-500">AI 기술로 차별화된 서비스를 제공합니다</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Feature 1 */}
                        <div className="group rounded-2xl bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A3FF] text-white shadow-lg shadow-blue-500/30">
                                <img src={imgIcon} alt="Icon" className="h-7 w-7 invert brightness-0" />
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-slate-900">AI 기반 개발</h3>
                            <p className="text-sm leading-relaxed text-slate-500">
                                최첨단 AI 기술로 웹사이트를 자동화하고 최적화합니다.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group rounded-2xl bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A3FF] text-white shadow-lg shadow-blue-500/30">
                                <img src={imgIcon1} alt="Icon" className="h-7 w-7 invert brightness-0" />
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-slate-900">빠른 제작</h3>
                            <p className="text-sm leading-relaxed text-slate-500">
                                전통적인 방식보다 3배 빠른 개발 속도를 제공합니다.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group rounded-2xl bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A3FF] text-white shadow-lg shadow-blue-500/30">
                                <img src={imgIcon2} alt="Icon" className="h-7 w-7 invert brightness-0" />
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-slate-900">글로벌 표준</h3>
                            <p className="text-sm leading-relaxed text-slate-500">
                                세계적 수준의 디자인과 성능을 보장합니다.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group rounded-2xl bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A3FF] text-white shadow-lg shadow-blue-500/30">
                                <img src={imgIcon3} alt="Icon" className="h-7 w-7 invert brightness-0" />
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-slate-900">안전한 보안</h3>
                            <p className="text-sm leading-relaxed text-slate-500">
                                엔터프라이즈급 보안으로 데이터를 보호합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Recent Works Section */}
                <section className="bg-slate-50 px-6 py-24 lg:px-20 lg:py-32">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">최근 작업물</h2>
                        <p className="text-slate-500">우리가 만든 성공 사례를 확인하세요</p>
                    </div>

                    <div className="mx-auto max-w-5xl">
                        <div className="flex aspect-video w-full items-center justify-center rounded-3xl bg-white shadow-xl shadow-slate-200/50">
                            {/* Placeholder Content for Works */}
                            <div className="text-center">
                                <button className="rounded-full bg-[#0066FF] px-8 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
                                    더 많은 작업물 보기 &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-[#0066FF] to-[#00A3FF] px-6 py-24 text-center text-white lg:py-32">
                    <h2 className="mb-6 text-3xl font-bold lg:text-5xl">프로젝트를 시작할 준비가 되셨나요?</h2>
                    <p className="mb-10 text-blue-100 opacity-90">지금 바로 문의하시고 무료 상담을 받아보세요</p>
                    <button className="rounded-full bg-white px-10 py-4 text-base font-bold text-[#0066FF] shadow-lg transition hover:bg-slate-100 hover:shadow-xl hover:scale-105 active:scale-100">
                        지금 시작하기
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-100 bg-white px-6 py-20 lg:px-20">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-4">
                    <div className="col-span-1">
                        <h3 className="mb-6 text-2xl font-bold text-[#00A3FF]">PLOLUX</h3>
                        <p className="text-sm leading-relaxed text-slate-500">
                            AI 기반 웹 에이전시로 미래를 만듭니다.<br />
                            혁신적인 기술과 디자인의 만남.
                        </p>
                        <div className="mt-6 flex gap-4 opacity-60">
                            {/* Social Icons Placeholders */}
                            <div className="h-5 w-5 bg-slate-400 rounded-sm"></div>
                            <div className="h-5 w-5 bg-slate-400 rounded-sm"></div>
                            <div className="h-5 w-5 bg-slate-400 rounded-sm"></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 font-bold text-slate-900">빠른 링크</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-[#00A3FF]">회사소개</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF]">서비스</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF]">포트폴리오</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF]">블로그</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 font-bold text-slate-900">법적 고지</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-[#00A3FF]">이용약관</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF]">개인정보처리방침</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 font-bold text-slate-900">연락처</h4>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li>contact@plolux.com</li>
                            <li>02-1234-5678</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
                    © 2024 PLOLUX. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
