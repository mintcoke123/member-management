"use client";

import { useState, useMemo } from "react";
import membersData from "./data/members";

interface Member {
  name: string;
  referralScore: number;
  thankYouScore: number;
  avgVisitorScore: number;
  oneToOneScore: number;
  trainingScore: number;
  absenteeismScore: number;
  arrivingOnTimeScore: number;
  totalScore: number;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>(membersData);

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const getStatusText = (category: string, score: number) => {
    switch (category) {
      case "referral":
        if (score === 20) return "1.5건 이상";
        if (score === 15) return "1.0~1.2건";
        if (score === 10) return "0.75~1.0건";
        if (score === 5) return "0.5~0.75건";
        return "0.5건 미만";

      case "thankYou":
        if (score === 15) return "1.5억 이상";
        if (score === 10) return "5천만~1억";
        if (score === 5) return "2.5천만~5천만";
        return "2.5천만 미만";

      case "avgVisitor":
        if (score === 20) return "0.8명 이상";
        if (score === 15) return "0.6~0.8명";
        if (score === 10) return "0.4~0.6명";
        if (score === 5) return "0.2~0.4명";
        return "0.1명 미만";

      case "oneToOne":
        if (score === 10) return "3회 이상";
        if (score === 5) return "2~3회";
        return "1회 미만";

      case "training":
        if (score === 10) return "30점 이상";
        if (score === 5) return "10~20점";
        return "10점 미만";

      case "absenteeism":
        return "";

      case "arrivingOnTime":
        return "";

      default:
        return "";
    }
  };

  const getBarColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    if (percentage >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getTotalScoreColor = (total: number) => {
    if (total >= 70) return "text-green-500";
    if (total >= 50) return "text-yellow-500";
    if (total >= 30) return "text-red-500";
    return "text-black";
  };

  const BarChart = ({ member }: { member: Member }) => {
    const categories = [
      { name: "리퍼럴", score: member.referralScore, max: 20, key: "referral" },
      { name: "감사장", score: member.thankYouScore, max: 15, key: "thankYou" },
      {
        name: "비지터",
        score: member.avgVisitorScore,
        max: 20,
        key: "avgVisitor",
      },
      { name: "원투원", score: member.oneToOneScore, max: 10, key: "oneToOne" },
      {
        name: "트레이닝",
        score: member.trainingScore,
        max: 10,
        key: "training",
      },
      {
        name: "결석",
        score: member.absenteeismScore,
        max: 15,
        key: "absenteeism",
      },
      {
        name: "정시도착",
        score: member.arrivingOnTimeScore,
        max: 10,
        key: "arrivingOnTime",
      },
    ];

    return (
      <div className="space-y-4">
        {categories.map((category) => {
          const percentage = (category.score / category.max) * 100;
          return (
            <div key={category.key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {category.name}
                </span>
                <span className="text-sm font-semibold text-gray-600">
                  {category.score}/{category.max}점
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ease-out ${getBarColor(
                      category.score,
                      category.max
                    )}`}
                    style={{
                      width: `${percentage}%`,
                      transition: "width 0.5s ease-out",
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 min-w-[100px]">
                  {getStatusText(category.key, category.score)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            멤버 평가 시스템
          </h1>
          <p className="text-lg text-gray-600">멤버별 성과 평가</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="relative">
            <div className="w-6 h-6 flex items-center justify-center absolute left-3 top-1/2 transform -translate-y-1/2">
              <i className="ri-search-line text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="멤버 이름을 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 멤버 목록 */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                멤버 목록 ({filteredMembers.length}명)
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredMembers.map((member, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedMember(member)}
                    className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${
                      selectedMember?.name === member.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-2xl font-bold ${getTotalScoreColor(
                            member.totalScore
                          )}`}
                        >
                          {member.totalScore}점
                        </span>
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-arrow-right-s-line text-gray-400"></i>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span>총점: {member.totalScore}점</span>
                    </div>
                  </div>
                ))}
                {filteredMembers.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                      <i className="ri-search-line text-2xl text-gray-400"></i>
                    </div>
                    <p className="text-gray-500">검색 결과가 없습니다</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 상세 바 그래프 */}
          {selectedMember ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {selectedMember.name}
                </h2>
                <div
                  className={`text-3xl font-bold ${getTotalScoreColor(
                    selectedMember.totalScore
                  )}`}
                >
                  {selectedMember.totalScore}점
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  상세 점수
                </h3>
                <BarChart member={selectedMember} />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                <i className="ri-bar-chart-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                멤버를 선택해주세요
              </h3>
              <p className="text-gray-500">
                왼쪽 목록에서 멤버를 클릭하면 상세 바 그래프를 볼 수 있습니다
              </p>
            </div>
          )}
        </div>

        {/* 점수 범위 안내 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            점수 범위 안내
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-green-500 font-bold text-lg">70점 이상</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-yellow-500 font-bold text-lg">50-69점</div>
            </div>
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-500 font-bold text-lg">30-49점</div>
            </div>
            <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-black font-bold text-lg">30점 미만</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
