import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Plotly from 'react-plotly.js';
import MainCard from '../components/MainCard.jsx';
import SecCard from '../components/SecCard.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";


export default function PublicationDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    groupby: 'category',
});

  useEffect(() => {
    getData();
  }, [filters])

  const getData = () => {
    setLoading(true);

    axiosClient.get('/rdpublication', {
      params: filters
    })
    .then(({data}) => {
      setLoading(false);
      setData(data);
      console.log(data);
    })
    .catch(() => {
      setLoading(false);
    })
  }

  const barTraces = data?.charts?.stacked?.series?.map((s, index) => ({
    x: data.charts.stacked.labels.map(String),
    y: s.counts,
    name: s.name,
    type: 'bar',
    width: 0.4,
    marker: { color: ['#01ac42', '#F2EA00', '#4E98FF', '#D84CFF', '#FF6284'][index % 5] }
})) || [];

// Accessing the total line
const totalLine = {
    x: data?.charts?.stacked?.labels?.map(String),
    y: data?.charts?.stacked?.total_line,
    name: 'Total',
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: '#00702B' }
};

  return (
    <div>
      {loading ? (
        <p>Loading Dashboard...</p>
      ) : (
      <>
      <div className="grid grid-cols-12 h-16 sm:h-8 bg-gray-400/50 content-around">
        <div className="col-span-8 pl-3 font-(family-name: --font-inter) font-[650] text-lg">
          RADIIS Publications
        </div>
        <div className="col-span-2 pt-3 sm:pt-1 pl-20 justify-end">
          <div className="font-[650]">Filter: </div>
        </div>
        <div className="col-span-2 pt-3 sm:pt-1">
            <select 
            className="right-0"
            value={filters.year} 
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
            <option value="">All Years</option>
            {Object.values(data?.stats?.all_year || {}).map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
            ))}
            </select>
        </div>
        </div>
        <div className="px-6 pt-4">
            <div className="grid grid-cols-4 md:grid-cols-12 gap-3 mb-2">
                <div className="col-span-4">       
                        <div>
                            <MainCard icon={<FontAwesomeIcon icon={faBook} className="text-green-600 text-3xl" />} number={data?.stats?.total_pub} title="Total Publications" />
                        </div>
                        <div className="mt-3">
                            <SecCard icon={<FontAwesomeIcon icon={faCalendarPlus} className="text-white text-3xl" />} number={data?.stats?.new_pub} percent={<span className={data?.percentages?.year_percent > 0 ? 'text-green-600' : 'text-red-600'}>
                            {data?.percentages?.year_percent > 0 ? '▲' : '▼'} {data?.percentages?.year_percent}%
                            </span>} title={`New Publications in ${data?.stats?.max_year}`}/>
                        </div>
                </div>
                <div className="col-span-4 md:col-span-8">
                    <div className="border-l-6 border-green-600 bg-white rounded-[1vw] inset-shadow-xl shadow-xl h-75">
                        
                            <div className="font-[650] text-lg text-gray-700 pl-6 pt-4">
                                Publications per Year
                            </div>
                            <div className="flex justify-end pr-5">
                                <select 
                                    className="right-0 "
                                    value={filters.groupby} 
                                    onChange={(e) => setFilters({ ...filters, groupby: e.target.value })}
                                    >
                                        <option value="category">Per Category</option>
                                        <option value="level">Per Level</option>
                                </select>
                            </div>
                            <div>
                        <Plotly 
                            data={[
                                ...barTraces, 
                                totalLine
                            ]}
                            layout={{
                                height: 220,
                                barcornerradius: 5,
                                barmode: 'stack',
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                margin: { l: 60, r: 70, b: 20, t: 10},
                                showlegend: true,
                                xaxis: {
                                linecolor: '#00702B', 
                                linewidth: 2,
                                showline: true,
                                tickcolor: '#00702B',
                                tickfont: {
                                    color: '#00702B',
                                    size: 11
                                },
                                type: 'category'
                                },
                                yaxis: {
                                showgrid: true,
                                gridcolor: '#f0f0f0',
                                rangemode: 'tozero',
                                zeroline: false,
                                },
                                legend: {
                                    x: 1,           // Snaps to the right edge of the plot
                                    xanchor: 'right', 
                                    y: 1.2,         // Moves it slightly above the plot line
                                    orientation: 'h', // Horizontal layout saves a lot of "right-side" space
                                    bgcolor: 'rgba(255, 255, 255, 0.5)',
                                    font: { size: 7 },
                                }
                            }}
                            useResizeHandler={true}
                            style={{ width: "100%", height: "100%" }}
                            config={{ displaylogo: false, responsive: true }}
                        />
                        </div>
                    
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-12 gap-3">
                <div className="col-span-4 h-96 border-t-6 border-green-600 bg-white rounded-[1vw] inset-shadow-xl shadow-xl">
                    <div className='grid grid-rows-7 h-full'>
                        <div className='row-span-1 font-[750] text-lg text-gray-700 w-full rounded-t-[1vw] align-middle pt-4 pl-7'>Publications per Category</div>
                        <div className='row-span-6 h-full w-full'>
                        <Plotly 
                            data={[{
                                values: data?.charts?.per_category_values,
                                labels: data?.charts?.per_category_labels,
                                hovertemplate: '<b>Ctegory:</b> %{label} <br><b>Count:</b> %{value}<br><b>Percent: </b>%{percent}<extra></extra>',
                                hole: .6,
                                type: 'pie',
                                outsidetextfont: {color: 'transparent'},
                                marker: {colors: ['#01ac42', '#FFEB00']}
                                },]} 
                            layout={{
                                autosize: true, plot_bgcolor: 'rgba(5,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                                margin: {l: 10, r: 10, b: 10, t: 10}, xaxis: {gridcolor: 'rgba(25,31,52,0)'},
                                yaxis: {automargin: true, gridcolor: 'rgba(25,31,52,0.4)'}, showlegend: false, 
                                font: {family: 'Inter, monospace'}
                                }}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                            config = {{responsive: true, displaylogo: false}}
                        />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 h-96 border-t-6 border-green-600 bg-white rounded-[1vw] inset-shadow-xl shadow-xl">
                    <div className='grid grid-rows-7 h-full'>
                        <div className='row-span-1 font-[750] text-lg text-gray-700 w-full rounded-t-[1vw] align-middle pt-4 pl-7'>Publications per Level</div>
                        <div className='row-span-6 h-full w-full'>
                        <Plotly 
                            data={[{
                                values: data?.charts?.per_level_values,
                                labels: data?.charts?.per_level_labels,
                                hovertemplate: '<b>Level:</b> %{label} <br><b>Count:</b> %{value}<br><b>Percent: </b>%{percent}<extra></extra>',
                                hole: .6,
                                type: 'pie',
                                outsidetextfont: {color: 'transparent'},
                                marker: {colors: ['#01ac42', '#FFEB00']}
                                },]} 
                            layout={{
                                autosize: true, plot_bgcolor: 'rgba(5,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                                margin: {l: 10, r: 10, b: 10, t: 10}, xaxis: {gridcolor: 'rgba(25,31,52,0)'},
                                yaxis: {automargin: true, gridcolor: 'rgba(25,31,52,0.4)'}, showlegend: false, 
                                font: {family: 'Inter, monospace'}
                                }}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                            config = {{responsive: true, displaylogo: false}}
                        />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 h-96 border-t-6 border-green-600 bg-white rounded-[1vw] inset-shadow-xl shadow-xl mb-5">
                    <div className='grid grid-rows-7 h-full'>
                        <div className='row-span-1 font-[750] text-lg text-gray-700 w-full rounded-t-[1vw] align-middle pt-4 pl-7'>Publications per Unit</div>
                        <div className='row-span-6 h-full w-full'>
                        <Plotly 
                            data={[{
                                values: data?.charts?.per_unit_values,
                                labels: data?.charts?.per_unit_labels,
                                hovertemplate: '<b>Unit:</b> %{label} <br><b>Count:</b> %{value}<br><b>Percent: </b>%{percent}<extra></extra>',
                                hole: .6,
                                type: 'pie',
                                outsidetextfont: {color: 'transparent'},
                                marker: {colors: ['#01ac42', '#FFEB00']}
                                },]} 
                            layout={{
                                autosize: true, plot_bgcolor: 'rgba(5,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                                margin: {l: 10, r: 10, b: 10, t: 10}, xaxis: {gridcolor: 'rgba(25,31,52,0)'},
                                yaxis: {automargin: true, gridcolor: 'rgba(25,31,52,0.4)'}, showlegend: false, 
                                font: {family: 'Inter, monospace'}
                                }}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                            config = {{responsive: true, displaylogo: false}}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
      )}
      </div>
      );
}
        
                {/* <div className="col-span-8"> */}
                    {/* <Plotly 
                        data={[
                            {
                            type: 'bar', 
                            width: 0.4, 
                            x: data?.charts?.year_labels?.map(String), 
                            y: data?.charts?.year_counts,
                            text: data?.charts?.year_counts?.map(String), 
                            textposition: 'auto', // Automatically puts it inside or above the bar
                            marker: {color: '#01ac42'},
                            width: 0.4,
                            },
                            {
                            x: data?.charts?.year_labels?.map(String),
                            y: data?.charts?.year_counts,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                            text: data?.charts?.year_counts?.map(String), 
                            textposition: 'auto', // Automatically puts it inside or above the bar
                            width: 0.4,
                            },]}
                        layout={{height: 190, barcornerradius: 10, plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                            margin: {l: 50, r: 0, b: 20, t: 10, pad: 1
                            }}}
                        useResizeHandler={true}
                        style={{width: "100%", height: "100%"}}
                        config = {{displaylogo: false}}
                        /> */}
                {/* </div> */}
            
{/*                 
                <div className='grid grid-cols-6 md:grid-cols-12 gap-2'>
                <div className='col-span-6 md:col-span-5'>
                    <div className='bg-linear-to-br from-white to-gray-100 flex flex-wrap h-96 rounded-[1vw] inset-shadow-xl shadow-xl'>
                    <div className='w-full grid grid-cols-12 grid-rows-7'>
                        <div className='col-span-12 row-span-1 font-[750] text-lg text-gray-700 w-full rounded-t-[1vw] align-middle pt-4 pl-7'>Projects per Type</div>
                        <div className='col-span-12 row-span-6'> */}
                            {/* <Plotly 
                            data={[
                            {
                                values: [data?.charts?.type_res, data?.charts?.type_dev, data?.charts?.type_resdev],
                                labels: ['Research', 'Development', 'Research & Development'],
                                hovertemplate: '<b>Type:</b> %{label} <br><b>Count:</b> %{value}<br><b>Percent: </b>%{percent}<extra></extra>',
                                hole: .6,
                                type: 'pie',
                                marker: {colors: ['#01ac42', '#FFEB00']}

                            },]} 
                            layout={
                                {plot_bgcolor: 'rgba(5,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                                margin: {l: 35, r: 15, b: 15, t: 15}, xaxis: {gridcolor: 'rgba(25,31,52,0)'},
                                yaxis: {automargin: true, gridcolor: 'rgba(25,31,52,0.4)'}, showlegend: true, 
                                font: {family: 'Inter, monospace'}
                                }}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                            config = {{displaylogo: false}}/>*/} 
                        {/* </div> 
                    </div>
                    </div>

                    <div className='grid grid-cols-5 gap-x-1'>
                        <div className='bg-white inset-shadow-lg rounded-lg shadow-xl h-37 mt-2 mr-1 pt-4 pl-4 gap- col-span-5 md:col-span-3 overflow-hidden'>
                        <div className='bg-green-500/50 rounded-lg h-12 w-16'></div>
                        <div className='gap-y-0 pt-2'> */}
                            {/* <p className='text-xl sm:text-base text-right font-[650] pr-4 align-bottom'>₱ {data?.stats?.total_budget?.toLocaleString()}</p> */}
                            {/* <p className='text-xl sm:text-base text-right font-[650] pr-4 align-bottom'>₱ 2000000</p>
                            <p className='text-right text-xs font-medium pr-4 align-top'>Total Approved Project Budget</p>
                        </div>
                        </div>
                        
                        <div className='bg-white inset-shadow-lg rounded-lg shadow-xl h-37 pt-4 pl-4 mt-2 mr-1 col-span-5 md:col-span-2 overflow-hidden'>
                        <div className='bg-green-500/50 rounded-lg h-12 w-16'></div>
                        <div className='pt-2'> */}
                            {/* <p className='text-2xl sm:text-base text-right font-[650] pr-4 align-bottom'>₱ {data?.stats?.new_budget?.toLocaleString()}</p> */}
                            {/* <p className='text-2xl sm:text-base text-right font-[650] pr-4 align-bottom'>₱ 200000</p>
                            <p className='text-right text-xs font-medium pr-4 align-top'>Total Approved Project Budget</p>
                        </div>
                        </div>
                    </div>
                </div>
                
                <div className='col-span-7'>
                    <div className='bg-white inset-shadow-lg h-66 rounded-[1vw] shadow-xl'>
                    <div className=' bg-green-500/50 text-md font-(family-name: --font-inter) font-[550] w-full h-12 rounded-t-[1vw] align-middle pt-3 pl-4'>Initiated Projects per Year</div>
                    <div className='pr-16'> */}
                        {/* <Plotly 
                        data={[
                            {
                            type: 'bar', 
                            width: 0.4, 
                            x: data?.charts?.year_labels?.map(String), 
                            y: data?.charts?.year_counts,
                            text: data?.charts?.year_counts?.map(String), 
                            textposition: 'auto', // Automatically puts it inside or above the bar
                            marker: {color: '#01ac42'},
                            width: 0.4,
                            },
                            {
                            x: data?.charts?.year_labels?.map(String),
                            y: data?.charts?.year_counts,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                            text: data?.charts?.year_counts?.map(String), 
                            textposition: 'auto', // Automatically puts it inside or above the bar
                            width: 0.4,
                            },]}
                        layout={{height: 190, barcornerradius: 10, plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                            margin: {l: 50, r: 0, b: 20, t: 10, pad: 1
                            }}}
                        useResizeHandler={true}
                        style={{width: "100%", height: "100%"}}
                        config = {{displaylogo: false}}
                        /> */}
                        {/* </div>
                    </div>

                    <div className='bg-white inset-shadow-lg h-67 mt-2 rounded-[1vw] shadow-xl'>
                    <div className='bg-green-500/50 text-md w-full h-12 font-(family-name: --font-inter) font-[550] rounded-t-[1vw] align-middle pt-3 pl-4'>Approved Project Budget per Year</div>
                    <div> */}
                        {/* <Plotly 
                        data={[
                            {
                            x: data?.charts?.budget_labels?.map(String),
                            y: data?.charts?.res_sums,
                            name: 'Research',
                            type: 'bar',
                            marker: {color: '#01ac42'},
                            width: 0.4,
                            },
                            {
                            x: data?.charts?.budget_labels?.map(String),
                            y: data?.charts?.dev_sums,
                            name: 'Development',
                            type: 'bar',
                            marker: {color: '#F2EA00'},
                            width: 0.4,
                            },
                            {
                            x: data?.charts?.budget_labels?.map(String),
                            y: data?.charts?.resdev_sums,
                            name: 'Research and Development',
                            type: 'bar',
                            marker: {color: '#4E98FF'},
                            width: 0.4,
                            },
                            {
                            x: data?.charts?.budget_labels?.map(String),
                            y: data?.charts?.budget_totals,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: '#00702B'},
                            name: 'Total'
                            },
                        ]}
                        layout={{
                            height: 220,
                            barmode: 'stack',
                            plot_bgcolor: 'rgba(0,0,0,0)',
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            margin: {l: 50, r: 50, b: 30, t: 30, pad: 4},
                            // legend: {orientation: 'h', x: 0.02, y: -0.15},
                            barcornerradius: 10,
                        }}
                        useResizeHandler={true}
                        style={{width: "100%", height: "100%"}}
                        config = {{displaylogo: false}}
                        /> */}
                    {/* </div>
                    </div>
                </div>
                </div>
        </div> */}
                {/* </>
                // )
                // } */}
        {/* </div> */}
    {/* </div>
  );
} */}