import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import 'chart.js/auto';

const Body = () => {
  const [makeData, setMakeData] = useState(null);
  const [modelData, setModelData] = useState(null);
  const [countyData, setCountyData] = useState(null);
  const [yearData, setYearData] = useState(null);
  const [brandModelData, setBrandModelData] = useState(null);
  const [evTypeMakeData, setEvTypeMakeData] = useState(null);

  // CSV Analysis Function
  const analyzeCSVData = (data) => {
    const makeCounts = {};
    const modelCounts = {};
    const countyCounts = {};
    const yearCounts = {};
    const brandModelCounts = {};
    const typeMakeCounts = {};

    data.forEach((row) => {
        const make = row.Make;
        const model = row.Model;
        const county = row.County;
        const year = row['Model Year'];
        const type = row['Vehicle Type'];
        makeCounts[make] = (makeCounts[make] || 0) + 1;
        modelCounts[model] = (modelCounts[model] || 0) + 1;
        countyCounts[county] = (countyCounts[county] || 0) + 1;
        yearCounts[year] = (yearCounts[year] || 0) + 1;
        
        const brandModelKey = `${make} - ${model}`;
        brandModelCounts[brandModelKey] = (brandModelCounts[brandModelKey] || 0) + 1;
        
        const typeMakeKey = `${type} - ${make}`;
        typeMakeCounts[typeMakeKey] = (typeMakeCounts[typeMakeKey] || 0) + 1;
    });

    setMakeData({
      labels: Object.keys(makeCounts),
      datasets: [
        {
          data: Object.values(makeCounts),
          backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f1c40f'],
        },
      ],
    });

    // Prepare Pie Chart Data for Model
    setModelData({
      labels: Object.keys(modelCounts),
      datasets: [
        {
          data: Object.values(modelCounts),
          backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f1c40f'],
        },
      ],
    });

    // Prepare Pie Chart Data for County
    setCountyData({
      labels: Object.keys(countyCounts),
      datasets: [
        {
          data: Object.values(countyCounts),
          backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#f1c40f'],
        },
      ],
    });

    // Prepare Bar Chart Data for Year
    setYearData({
      labels: Object.keys(yearCounts),
      datasets: [
        {
          label: 'Vehicle Count',
          data: Object.values(yearCounts),
          backgroundColor: '#3498db',
        },
      ],
    });

    
    setBrandModelData({
      labels: Object.keys(brandModelCounts),
      datasets: [
        {
          label: 'Vehicle Count',
          data: Object.values(brandModelCounts),
          backgroundColor: '#e74c3c',
        },
      ],
    });
    setEvTypeMakeData({
        labels: Object.keys(typeMakeCounts),
        datasets: [
          {
            label: 'Vehicle Count',
            data: Object.values(typeMakeCounts),
            backgroundColor: '#3498db',
          },
        ],
      });
  };

  // Load CSV File
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./public/Electric_Vehicle_Population_Data.csv');
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          analyzeCSVData(results.data);
        },
      });
    };

    fetchData();
  }, []);

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Single Card containing all 3 Pie Charts in one line */}
      {makeData && modelData && countyData && (
        <div className="bg-white shadow rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">EV Distribution</h2>
          <div className="flex justify-between items-center gap-6">
            {/* Pie Chart for Make */}
            <div className="w-1/4 text-center">
              <Pie 
                data={makeData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    tooltip: {
                      enabled: true, // Tooltip is enabled
                      mode: 'nearest', // Nearest segment will trigger the tooltip
                      callbacks: {
                        label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                      },
                    },
                  },
                }} 
              />
              <p className="mt-2">EV Brand Distribution</p>
            </div>
            {/* Pie Chart for Model */}
            <div className="w-1/4 text-center">
              <Pie 
                data={modelData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    tooltip: {
                      enabled: true,
                      mode: 'nearest',
                      callbacks: {
                        label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                      },
                    },
                  },
                }} 
              />
              <p className="mt-2">Model Distribution</p>
            </div>
            {/* Pie Chart for County */}
            <div className="w-1/4 text-center">
              <Pie 
                data={countyData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    tooltip: {
                      enabled: true, // Tooltip is enabled
                      mode: 'nearest', // Nearest segment will trigger the tooltip
                      callbacks: {
                        label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                      },
                    },
                  },
                }} 
              />
              <p className="mt-2">County Distribution</p>
            </div>
          </div>
        </div>
      )}

      {/* Separate Card for Bar Chart (Vehicle Count by Year) */}
      {yearData && (
        <div className="bg-white shadow rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3 mt-6">
          <h2 className="text-lg font-semibold mb-4">Vehicles by Year</h2>
          <Bar
            data={yearData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                tooltip: {
                  enabled: true, // Tooltip is enabled
                  callbacks: {
                    label: function(tooltipItem) {
                      return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}

      {/* Separate Card for Bar Chart (Brand and Model Distribution) */}
      {brandModelData && (
        <div className="bg-white shadow rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3 mt-6">
          <h2 className="text-lg font-semibold mb-4">Brand and Model Distribution</h2>
          <Bar
            data={brandModelData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                tooltip: {
                  enabled: true, // Tooltip is enabled
                  callbacks: {
                    label: function(tooltipItem) {
                      return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    maxRotation: 90,  // Rotate the x-axis labels for better readability
                    minRotation: 45,
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
      {evTypeMakeData && (
        <div className="bg-white shadow rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3 mt-6">
          <h2 className="text-lg font-semibold mb-4">Electric Vehicle Type and Make</h2>
          <Bar
            data={evTypeMakeData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                tooltip: {
                  enabled: true, // Tooltip is enabled
                  callbacks: {
                    label: function (tooltipItem) {
                      return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    maxRotation: 90, // Rotate the x-axis labels for better readability
                    minRotation: 45,
                  },
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Body;
