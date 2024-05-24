"use client"
import Header from "@/app/components/Header";
import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { FaFilter } from "react-icons/fa";
import { makeStyles } from '@mui/styles';
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '1em',
  },
  arrow: {
    color: 'black',
  },
});

export default function Home() {
  const classes = useStyles(); 
  const [hoverText, setHoverText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedRegion, setSelectedRegion] = useState('全ての項目'); // デフォルトで全ての項目を選択
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // サイドバーの開閉状態
  const [isPercentageMode, setIsPercentageMode] = useState(false); // 表示モードの切り替え

  const regions = [
    {
      regionName: '関東',
      companies: [
        { name: '企業A', data: ["20/50", "50/50", "0/50", "28/50", "27/50", "29/50", "24/50", "22/50", "26/50", "27/50"] },
        { name: '企業B', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業C', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業D', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業E', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] }
      ]
    },
    {
      regionName: '関西',
      companies: [
        { name: '企業G', data: ["28/40", "25/40", "24/40", "21/40", "29/40", "32/40", "17/40", "24/40", "19/40", "17/40"] },
        { name: '企業H', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業I', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業J', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] }
      ]
    },
    {
      regionName: '北陸',
      companies: [
        { name: '企業K', data: ["33/55", "23/55", "27/55", "29/55", "31/55", "27/55", "33/55", "31/55", "26/55", "22/55"] },
        { name: '企業L', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業M', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業N', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] },
        { name: '企業O', data: ["35/40", "30/40", "8/40", "33/40", "28/40", "26/40", "30/40", "32/40", "27/40", "28/40"] }
      ]
    }
  ];

  const getColorClass = (numerator, denominator) => {
    const ratio = numerator / denominator;
    if (ratio <= 0.4) {
      return 'bg-blue-700 text-white';
    } else if (ratio >= 0.7) {
      return 'bg-rose-600 text-white';
    }
    return 'bg-white';
  };

  const parseAndStyleCell = (cellData) => {
    const [numerator, denominator] = cellData.split('/').map(Number);
    const remaining = denominator - numerator;
    const ratio = (numerator / denominator) * 100;
    const colorClass = getColorClass(numerator, denominator);
    return { colorClass, text: isPercentageMode ? `${ratio.toFixed(1)}%` : `${remaining}`, fraction: `${numerator}/${denominator}` };
  };

  const handleMouseEnter = (fraction, event) => {
    setHoverText(fraction);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoverText('');
  };

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDisplayMode = () => {
    setIsPercentageMode(!isPercentageMode);
  };

  // 全ての項目を表示するためのデータを作成
  const allCompanies = regions.flatMap(region => region.companies);
  const selectedRegionData = selectedRegion === '全ての項目'
    ? regions // 全ての項目が選択された場合、全ての地域を含む配列を返す
    : [regions.find(region => region.regionName === selectedRegion)];

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <div className={`sidebar ${isSidebarOpen ? 'w-1/6' : 'w-12'} bg-gray-200 p-4 transition-width duration-300 mt-5 rounded-r-lg shadow`}>
          <button onClick={toggleSidebar} className="mb-4">
            <FaFilter />
          </button>
          {isSidebarOpen && (
            <>
              <button onClick={toggleDisplayMode} className="mb-4 bg-gray-400 p-2 rounded">
                {isPercentageMode ? '残数表示' : '％表示'}
              </button>
              <ul>
                <li className={`cursor-pointer p-2 ${selectedRegion === '全ての項目' ? 'bg-gray-400' : 'bg-gray-100'}`}
                    onClick={() => handleRegionClick('全ての項目')}>
                  全ての項目
                </li>
                {regions.map(region => (
                  <li key={region.regionName} className={`cursor-pointer p-2 ${region.regionName === selectedRegion ? 'bg-gray-400' : 'bg-gray-100'}`}
                      onClick={() => handleRegionClick(region.regionName)}>
                    {region.regionName}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <table className="table-bordered table-auto border-collapse m-6 w-full text-center">
            <tbody>
              <tr><td></td><td></td><td>1月1日</td><td>1月2日</td><td>1月3日</td><td>1月4日</td><td>1月5日</td><td>1月6日</td><td>1月7日</td><td>1月8日</td><td>1月9日</td><td>1月10日</td></tr>
              {selectedRegionData.map(region => (
                <React.Fragment key={region.regionName}>
                  <tr className="region-row">
                    <td colSpan={12} className="bg-gray-200 font-bold">{region.regionName}</td>
                  </tr>
                  {region.companies.map((company, companyIndex) => (
                    <tr key={company.name}>
                      {companyIndex === 0 && <td rowSpan={region.companies.length}>{region.regionName}</td>}
                      <td>{company.name}</td>
                      {company.data.map((data, index) => {
                        const { colorClass, text, fraction } = parseAndStyleCell(data);
                        return (
                          <Tooltip key={index} title={fraction} arrow classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>
                            <td className={`${colorClass} relative text-center`}
                                onMouseEnter={(event) => handleMouseEnter(fraction, event)}
                                onMouseLeave={handleMouseLeave}>
                              {text}
                            </td>
                          </Tooltip>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
