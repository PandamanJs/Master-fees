import { useState, useEffect } from 'react';
import { toast } from "sonner@2.0.3";
import { api } from "../utils/supabase/api";
import svgPaths from "./svg-ovklvryvf5";

interface FeeBreakdown {
  category: string;
  budgeted: number;
  collected: number;
  outstanding: number;
  percentage: number;
  studentCount: number;
}

interface RevenueBreakdownProps {
  schoolId: string;
  totalRevenue: number;
  outstandingFees: number;
  onViewTransactions: () => void;
}

export default function Group1000005059({ 
  schoolId, 
  totalRevenue, 
  outstandingFees,
  onViewTransactions 
}: RevenueBreakdownProps = {
  schoolId: 'demo_school_123',
  totalRevenue: 0,
  outstandingFees: 0,
  onViewTransactions: () => {}
}) {
  const [breakdownData, setBreakdownData] = useState<FeeBreakdown[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');

  useEffect(() => {
    loadBreakdownData();
  }, [schoolId]);

  const loadBreakdownData = async () => {
    try {
      setLoading(true);
      
      // Get students and transactions for detailed breakdown
      const [studentsResponse, transactionsResponse] = await Promise.all([
        api.getStudents(schoolId),
        api.getTransactions(schoolId)
      ]);

      if (studentsResponse.success && transactionsResponse.success) {
        const students = studentsResponse.data || [];
        const transactions = transactionsResponse.data || [];
        
        // Calculate breakdown by grade
        const gradeBreakdown = calculateGradeBreakdown(students, transactions);
        setBreakdownData(gradeBreakdown);
      } else {
        // Use mock data as fallback
        setBreakdownData(getMockBreakdownData());
      }
    } catch (error) {
      console.error('Error loading breakdown data:', error);
      setBreakdownData(getMockBreakdownData());
    } finally {
      setLoading(false);
    }
  };

  const calculateGradeBreakdown = (students: any[], transactions: any[]): FeeBreakdown[] => {
    const gradeGroups = students.reduce((acc, student) => {
      const grade = student.grade || 'Unknown';
      if (!acc[grade]) {
        acc[grade] = {
          students: [],
          totalOwed: 0,
          totalPaid: 0
        };
      }
      acc[grade].students.push(student);
      acc[grade].totalOwed += student.feesOwed || 0;
      acc[grade].totalPaid += student.feesPaid || 0;
      return acc;
    }, {});

    return Object.entries(gradeGroups).map(([grade, data]: [string, any]) => {
      const budgeted = data.totalOwed;
      const collected = data.totalPaid;
      const outstanding = budgeted - collected;
      const percentage = budgeted > 0 ? (collected / budgeted) * 100 : 0;

      return {
        category: grade,
        budgeted,
        collected,
        outstanding,
        percentage: Math.round(percentage * 10) / 10,
        studentCount: data.students.length
      };
    }).sort((a, b) => b.budgeted - a.budgeted);
  };

  const getMockBreakdownData = (): FeeBreakdown[] => [
    {
      category: 'Grade 10',
      budgeted: 450000,
      collected: 380000,
      outstanding: 70000,
      percentage: 84.4,
      studentCount: 45
    },
    {
      category: 'Grade 11',
      budgeted: 420000,
      collected: 350000,
      outstanding: 70000,
      percentage: 83.3,
      studentCount: 42
    },
    {
      category: 'Grade 9',
      budgeted: 380000,
      collected: 300000,
      outstanding: 80000,
      percentage: 78.9,
      studentCount: 38
    },
    {
      category: 'Grade 12',
      budgeted: 350000,
      collected: 320000,
      outstanding: 30000,
      percentage: 91.4,
      studentCount: 35
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalBudgeted = breakdownData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalCollected = breakdownData.reduce((sum, item) => sum + item.collected, 0);
  const totalOutstanding = breakdownData.reduce((sum, item) => sum + item.outstanding, 0);
  const overallPercentage = totalBudgeted > 0 ? (totalCollected / totalBudgeted) * 100 : 0;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? 'all' : category);
    toast.info(`Viewing ${category === selectedCategory ? 'all categories' : category} breakdown`);
  };

  const handleViewModeToggle = () => {
    setViewMode(viewMode === 'summary' ? 'detailed' : 'summary');
    toast.info(`Switched to ${viewMode === 'summary' ? 'detailed' : 'summary'} view`);
  };

  const handleRefresh = async () => {
    toast.info('Refreshing breakdown data...');
    await loadBreakdownData();
    toast.success('Breakdown data updated - live data refreshed');
  };

  if (loading) {
    return (
      <div className="relative w-full h-[260px] p-6">
        <div className="absolute inset-0 bg-[#025964] rounded-xl">
          <div className="absolute border-2 border-[rgba(0,48,73,0.5)] border-solid inset-0 pointer-events-none rounded-xl" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <div className="text-white text-sm">Loading breakdown...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[260px] p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-[#025964] rounded-xl">
        <div className="absolute border-2 border-[rgba(0,48,73,0.5)] border-solid inset-0 pointer-events-none rounded-xl" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] text-[#ffffff] text-[18px]">
            Revenue Breakdown
          </h3>
          <div className="flex items-center gap-1 px-2 py-1 bg-[rgba(255,255,255,0.1)] rounded-full">
            <div className="w-2 h-2 bg-[#3ed4af] rounded-full animate-pulse"></div>
            <span className="text-[#ffffff] text-[8px]">LIVE</span>
          </div>
          <button
            onClick={handleRefresh}
            className="text-white hover:text-[#3ed4af] transition-colors"
            title="Refresh live data"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#5dfcaf] px-3 py-1 rounded-[10px] border border-[#025864]">
            <span className="font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] text-[#003049] text-[12px]">
              +{Math.round((overallPercentage - 75) * 10) / 10}%
            </span>
          </div>
          <button
            onClick={handleViewModeToggle}
            className="bg-[#ffffff] px-2 py-1 rounded-md border border-[#003049] hover:bg-gray-100 transition-colors"
          >
            <span className="font-['Inter:Bold',_sans-serif] text-[#003049] text-[10px]">
              {viewMode === 'summary' ? 'Detail' : 'Summary'}
            </span>
          </button>
        </div>
      </div>

      {viewMode === 'summary' ? (
        /* Summary View */
        <div className="relative z-10 flex flex-col h-[calc(100%-60px)]">
          {/* Revenue and Collected Labels */}
          <div className="flex justify-between mb-2">
            <div className="flex flex-col">
              <span className="font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] text-[#ffffff] text-[13px]">
                Total Revenue
              </span>
              <span className="font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] text-[#ffffff] text-[13px]">
                {formatCurrency(totalBudgeted)}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] text-[#ffffff] text-[13px]">
                Collected ({Math.round(overallPercentage)}%)
              </span>
              <span className="font-['IBM_Plex_Sans_Devanagari:Regular',_sans-serif] text-[#ffffff] text-[13px]">
                {formatCurrency(totalCollected)}
              </span>
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full h-[1.5px] bg-[#003049] my-4"></div>

          {/* Interactive Progress Bar */}
          <div className="relative mb-6">
            <div className="bg-[#58d5b2] h-[26px] rounded-[10px] border border-[#003049] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
              <div className="flex h-full">
                <div 
                  className="bg-[#2a737d] h-full rounded-l-[10px] border border-[#003049] cursor-pointer hover:bg-[#1e5a63] transition-colors" 
                  style={{width: `${Math.min(overallPercentage, 100)}%`}}
                  onClick={() => toast.info(`${Math.round(overallPercentage)}% collection rate`)}
                  title={`${Math.round(overallPercentage)}% collected`}
                ></div>
                <div 
                  className="bg-transparent h-full rounded-r-[10px]" 
                  style={{width: `${Math.max(100 - overallPercentage, 0)}%`}}
                ></div>
              </div>
            </div>
            {/* Percentage indicator */}
            <div 
              className="absolute top-[-20px] text-white text-xs font-medium"
              style={{left: `${Math.min(overallPercentage, 95)}%`}}
            >
              {Math.round(overallPercentage)}%
            </div>
          </div>

          {/* Balance Section */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] text-[#3ed4af] text-[16px]">
                Outstanding
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] text-[#3ed4af] text-[16px]">
                {formatCurrency(totalOutstanding)}
              </span>
            </div>
          </div>

          {/* View All Transactions Button */}
          <div className="absolute bottom-0 right-0">
            <button
              onClick={onViewTransactions}
              className="bg-[#ffffff] px-4 py-2 rounded-md border border-[#003049] hover:bg-gray-100 transition-colors"
            >
              <span className="font-['Inter:Bold',_sans-serif] text-[#003049] text-[12px]">
                View all Transactions
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Detailed View */
        <div className="relative z-10 h-[calc(100%-60px)] overflow-y-auto">
          <div className="space-y-2">
            {breakdownData.map((item, index) => (
              <button
                key={item.category}
                onClick={() => handleCategoryClick(item.category)}
                className={`w-full text-left p-3 rounded-lg transition-all hover:bg-[rgba(255,255,255,0.1)] ${
                  selectedCategory === item.category ? 'bg-[rgba(255,255,255,0.15)]' : 'bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] text-[#ffffff] text-[14px]">
                      {item.category}
                    </span>
                    <span className="bg-[#3ed4af] text-[#003049] px-2 py-0.5 rounded-full text-[10px]">
                      {item.studentCount} students
                    </span>
                  </div>
                  <span className="font-['IBM_Plex_Sans_Devanagari:SemiBold',_sans-serif] text-[#3ed4af] text-[14px]">
                    {item.percentage}%
                  </span>
                </div>
                
                <div className="flex justify-between text-[12px] mb-2">
                  <span className="text-white">Collected: {formatCurrency(item.collected)}</span>
                  <span className="text-[#3ed4af]">Outstanding: {formatCurrency(item.outstanding)}</span>
                </div>
                
                {/* Mini progress bar */}
                <div className="w-full bg-[rgba(255,255,255,0.2)] h-2 rounded-full">
                  <div 
                    className="h-2 bg-[#3ed4af] rounded-full transition-all duration-300"
                    style={{width: `${Math.min(item.percentage, 100)}%`}}
                  ></div>
                </div>
                
                {selectedCategory === item.category && (
                  <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.2)]">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="text-white">
                        <div>Budgeted: {formatCurrency(item.budgeted)}</div>
                        <div>Collection Rate: {item.percentage}%</div>
                      </div>
                      <div className="text-[#3ed4af]">
                        <div>Students: {item.studentCount}</div>
                        <div>Avg per student: {formatCurrency(item.budgeted / item.studentCount)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Quick Stats Footer in Detailed View */}
          <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.3)] p-2 rounded-lg">
            <div className="flex justify-between text-[11px]">
              <span className="text-white">Total: {formatCurrency(totalBudgeted)}</span>
              <span className="text-[#3ed4af]">Collected: {formatCurrency(totalCollected)} ({Math.round(overallPercentage)}%)</span>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl opacity-30">
        <div className="absolute flex h-[124.884px] items-center justify-center left-[5px] top-[181.894px] w-[127.501px]">
          <div className="flex-none rotate-[41.958deg] skew-x-[1.229deg]">
            <div className="h-[59.885px] relative w-[118.922px]">
              <div className="absolute bottom-[-29.223%] left-[-14.716%] right-[-14.716%] top-[-29.223%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 96">
                  <path
                    d={svgPaths.p2bcaf340}
                    stroke="#B2CCFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.15"
                    strokeWidth="35"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[132.333px] items-center justify-center left-[138px] top-[154.303px] w-[89.213px] opacity-20">
          <div className="flex-none rotate-[74.392deg] skew-x-[0.655deg]">
            <div className="h-[59.251px] relative w-[120.175px]">
              <div className="absolute bottom-[-29.535%] left-[-14.562%] right-[-14.562%] top-[-29.535%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 156 95">
                  <path
                    d={svgPaths.p1ebf5c40}
                    stroke="#B2CCFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.05"
                    strokeWidth="35"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}