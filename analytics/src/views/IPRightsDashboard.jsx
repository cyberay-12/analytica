import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Plotly from 'react-plotly.js';
import MainCard from '../components/MainCard.jsx';
import SecCard from '../components/SecCard.jsx';

export default function IPRightDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    groupby: 'type',
});

  useEffect(() => {
    getData();
  }, [filters])

  const getData = () => {
    setLoading(true);

    axiosClient.get('/rdipright', {
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
          RADIIS Intellectual Property Rights
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
                            <MainCard number={data?.stats?.total_ipr} title="Total IPRs" />
                        </div>
                        <div className="mt-3">
                            <SecCard number={data?.stats?.new_ipr} percent={<span className={data?.percentages?.year_percent > 0 ? 'text-green-600' : 'text-red-600'}>
                            {data?.percentages?.year_percent > 0 ? '▲' : '▼'} {data?.percentages?.year_percent}%
                            </span>} title={`New IPRs in ${data?.stats?.max_year}`}/>
                        </div>
                </div>
                <div className="col-span-4 md:col-span-8">
                    <div className="border-l-6 border-green-600 bg-white rounded-[1vw] inset-shadow-xl shadow-xl h-75">
                        
                            <div className="font-[650] text-lg text-gray-700 pl-6 pt-4">
                                IPRs per Year
                            </div>
                            <div className="flex justify-end pr-6">
                                <select 
                                    className="right-0 "
                                    value={filters.groupby} 
                                    onChange={(e) => setFilters({ ...filters, groupby: e.target.value })}
                                    >
                                        <option value="type">Per Type</option>
                                        <option value="utilization">Per Utilization</option>
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
                                margin: { l: 60, r: 0, b: 20, t: 10},
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
                                    font: { size: 9 },
                                }
                            }}
                            useResizeHandler={true}
                            // style={{ width: "100%", height: "100%" }}
                            config={{ displaylogo: false, responsive: true }}
                        />
                        </div>
                    
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-12 gap-3">
                <div className="col-span-4 h-96 border-t-6 border-green-600 bg-white rounded-[1vw] inset-shadow-xl shadow-xl">
                    <div className='grid grid-rows-7 h-full'>
                        <div className='row-span-1 font-[750] text-lg text-gray-700 w-full rounded-t-[1vw] align-middle pt-4 pl-7'>IPRs per Type</div>
                        <div className='row-span-6 h-full w-full'>
                        <Plotly 
                            data={[{
                                values: data?.charts?.per_type_values,
                                labels: data?.charts?.per_type_labels,
                                hovertemplate: '<b>Type:</b> %{label} <br><b>Count:</b> %{value}<br><b>Percent: </b>%{percent}<extra></extra>',
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
                        <div className='row-span-1 font-[750] text-lg text-gray-700 w-full rounded-t-[1vw] align-middle pt-4 pl-7'>IPRs per Utilization</div>
                        <div className='row-span-6 h-full w-full'>
                        <Plotly 
                            data={[{
                                values: data?.charts?.per_util_values,
                                labels: data?.charts?.per_util_labels,
                                hovertemplate: '<b>Utilization:</b> %{label} <br><b>Count:</b> %{value}<br><b>Percent: </b>%{percent}<extra></extra>',
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
                        <div className='row-span-1 font-[750] text-lg text-gray-700 w-full rounded-t-[1vw] align-middle pt-4 pl-7'>IPRs per Unit</div>
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
        
               