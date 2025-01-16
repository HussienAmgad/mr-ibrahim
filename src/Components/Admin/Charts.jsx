import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Charts() {
  const [Prep, setPrep] = useState([]);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Last 7 days');

  // دالة لتحويل التاريخ
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  // دالة لتصفية البيانات حسب الخيار المحدد في القائمة المنسدلة
  const filterDataByDate = (data, range) => {
    const currentDate = new Date();
    switch (range) {
      case 'Yesterday':
        return data.filter(item => new Date(item.date).toDateString() === new Date(currentDate - 86400000).toDateString());
      case 'Today':
        return data.filter(item => new Date(item.date).toDateString() === currentDate.toDateString());
      case 'Last 7 days':
        return data.filter(item => new Date(item.date) >= new Date(currentDate - 7 * 86400000));
      case 'Last 30 days':
        return data.filter(item => new Date(item.date) >= new Date(currentDate - 30 * 86400000));
      case 'This month':
        return data.filter(item => new Date(item.date).getMonth() === currentDate.getMonth() && new Date(item.date).getFullYear() === currentDate.getFullYear());
      case 'Last month':
        const lastMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        return data.filter(item => new Date(item.date).getMonth() === lastMonthDate.getMonth() && new Date(item.date).getFullYear() === lastMonthDate.getFullYear());
      default:
        return data;
    }
  };

  const fetchData = async (range) => {
    try {
      const response1 = await fetch('https://mr-ibrahim-server.vercel.app/showprep1');
      const data1 = await response1.json();
      const response2 = await fetch('https://mr-ibrahim-server.vercel.app/showprep2');
      const data2 = await response2.json();
      const response3 = await fetch('https://mr-ibrahim-server.vercel.app/showprep3');
      const data3 = await response3.json();

      const combinedData = [...data1, ...data2, ...data3].sort((a, b) => new Date(b.date) - new Date(a.date));

      const filteredData = filterDataByDate(combinedData, range).map(item => {
        const date = new Date(item.date);
        const dayName = date.toLocaleDateString('ar-EG', { weekday: 'long' });
        const formattedDate = formatDate(date);
        return {
          ...item,
          date: `${dayName} ${formattedDate}`,
        };
      });

      setPrep(filteredData);
    } catch (error) {
      setError("هناك خطأ في جلب البيانات");
    }
  };

  useEffect(() => {
    fetchData(selectedOption);  // تحميل البيانات بناءً على الخيار الحالي
  }, [selectedOption]);

  useEffect(() => {
    const options = {
      colors: ['#1A56DB', '#FDBA8C'],
      series: [
        {
          name: 'Total of Student',
          data: Prep.map(item => ({
            x: item.date,
            y: item.attendance,
          })),
        },
        {
          name: 'Profit',
          data: Prep.map(item => ({
            x: item.date,
            y: item.profit,
          })),
        },
      ],
      dataLabels: { enabled: false },
      chart: { type: 'bar', height: 320, toolbar: { show: true } },
      plotOptions: { bar: { horizontal: false, columnWidth: '70%', borderRadius: 8 } },
      tooltip: { shared: true, intersect: false },
      xaxis: { labels: { style: { fontSize: '12px' } } },
      yaxis: { show: false },
      fill: { opacity: 1 },
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
      return () => chart.destroy();
    }
  }, [Prep]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <div className=" w-full bg-white shadow dark:bg-gray-800 p-4 md:p-6 h-full">
        <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
              <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
              </svg>
            </div>
            <div>
              <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">3.4k</h5>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Leads generated per week</p>
            </div>
          </div>
          <div>
            <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
              <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13V1m0 0L1 5m4-4 4 4" />
              </svg>
              42.5%
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <dl className="flex items-center">
            <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Money spent:</dt>
            <dd className="text-gray-900 text-sm dark:text-white font-semibold">$3,232</dd>
          </dl>
          <dl className="flex items-center justify-end">
            <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Conversion rate:</dt>
            <dd className="text-gray-900 text-sm dark:text-white font-semibold">1.2%</dd>
          </dl>
        </div>
        <div className='h-full' ref={chartRef} />
        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div className="flex justify-between items-center pt-5">
            <button onClick={toggleDropdown} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white" type="button">
              {selectedOption}
              <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
              </svg>
            </button>
            {isOpen && (
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'This month', 'Last month'].map(option => (
                    <li key={option}>
                      <a
                        href="#"
                        onClick={() => handleSelectOption(option)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
