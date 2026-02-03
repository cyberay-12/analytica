import Plotly from 'react-plotly.js';
import MainCard from '../components/MainCard.jsx';
import SecCard from '../components/SecCard.jsx';

export default function ProgramDashboard() {
  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-3 mb-2">
        <div className='col-span-3'>
          <MainCard number="43" title="Total Programs" />
        </div>
        <div className='col-span-3'>
          <SecCard number="20" percent="12%" title="Completed Programs"/>
        </div>
        <div className='col-span-3'>
          <SecCard number="10" percent="8%" title="Ongoing Programs"/>
        </div>
        <div className='col-span-3'>
          <SecCard number="7" percent="5%" title="Upcoming Programs"/>
        </div>
      </div>
      
    <div className='grid grid-cols-6 md:grid-cols-12 gap-2'>
      <div className='col-span-6 md:col-span-5'>
        <div className='bg-white flex flex-wrap h-96 rounded-[1vw] inset-shadow-xl shadow-xl'>
          <div className='w-full grid grid-cols-12 grid-rows-7'>
            <div className='col-span-12 row-span-1 bg-green-500/50 font-(family-name: --font-inter) font-[550] text-md w-full rounded-t-[1vw] align-middle pt-3 pl-4'>Programs per Type</div>
            <div className='col-span-12 row-span-6'>
                <Plotly 
                  data={[
                  {
                    values: [20, 22, 24, 34],
                    labels: ['Type1', 'Type2', 'Type3', 'Type4'],
                    hoverinfo: 'label+value+percent',
                    hole: .6,
                    type: 'pie',
                    marker: {colors: ['#00702B', '#F2EA00', '#FF8053', '#4E98FF']}

                  },]} 
                  layout={
                    {plot_bgcolor: 'rgba(5,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                      margin: {l: 50, r: 15, b: 15, t: 15}, xaxis: {gridcolor: 'rgba(25,31,52,0)'},
                      yaxis: {automargin: true, gridcolor: 'rgba(25,31,52,0.4)'}, showlegend: false, 
                    }}
                  useResizeHandler={true}
                  style={{width: "100%", height: "100%"}}
                  config = {{displaylogo: false}}/> 
            </div>
          </div>
        </div>

          <div className='grid grid-cols-5 gap-x-1'>
            <div className='bg-white inset-shadow-lg rounded-lg shadow-xl h-37 mt-2 mr-1 pt-4 pl-4 gap- col-span-5 md:col-span-3 overflow-hidden'>
              <div className='bg-green-500/50 rounded-lg h-12 w-16'></div>
              <div className='gap-y-0 pt-2'>
                <p className='text-base font-sans text-right font-[650] pr-4 align-bottom'>₱23,857,097,980.95</p>
                <p className='text-right font-sans text-xs font-medium pr-4 align-top'>Total Approved Program Budget</p>
              </div>
            </div>
            
            <div className='bg-white inset-shadow-lg rounded-lg shadow-xl h-37 pt-4 pl-4 mt-2 mr-1 col-span-5 md:col-span-2 overflow-hidden'>
              <div className='bg-green-500/50 rounded-lg h-12 w-16'></div>
              <div className='pt-2'>
                <p className='text-base font-sans text-right font-[650] pr-4 align-bottom'>₱23,857,097,980.95</p>
                <p className='text-right font-sans text-xs font-medium pr-4 align-top'>Total Approved Program Budget</p>
              </div>
            </div>
          </div>
      </div>
      
      <div className='col-span-7'>
        <div className='bg-white inset-shadow-lg h-66 rounded-[1vw] shadow-xl'>
          <div className=' bg-green-500/50 text-md font-(family-name: --font-inter) font-[550] w-full h-12 rounded-t-[1vw] align-middle pt-3 pl-4'>Initiated Programs per Year</div>
          <div className='pr-16'>
            <Plotly 
              data={[
                {type: 'bar', width: 0.4, x: ['Type 1', 'Type 2', 'Type 3'], y: [2, 5, 3]},
                {x: ['Type 1', 'Type 2', 'Type 3'],
                  y: [2, 6, 3],
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: 'green'},
                },]}
              layout={{height: 200, barcornerradius: 10, plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                margin: {l: 50, r: 0, b: 0, t: 25, pad: 4
                }}}
              useResizeHandler={true}
              style={{width: "100%", height: "100%"}}
              config = {{displaylogo: false}}
              />
            </div>
        </div>

        <div className='bg-white inset-shadow-lg h-67 mt-2 rounded-[1vw] shadow-xl'>
          <div className='bg-green-500/50 text-md w-full h-12 font-(family-name: --font-inter) font-[550] rounded-t-[1vw] align-middle pt-3 pl-4'>Approved Program Budget per Year</div>
          <div>
            <Plotly 
              data={[
                {
                  x: ["2021", "2022", "2023", "2024", "2025"],
                  y: [12, 35, 15, 27, 20],
                  name: 'Research',
                  type: 'bar',
                  marker: {color: '#00702B'},
                  width: 0.4,
                },
                {
                  x: ["2021", "2022", "2023", "2024", "2025"],
                  y: [8, 25, 15, 18, 15],
                  name: 'Development',
                  type: 'bar',
                  marker: {color: '#F2EA00'},
                  width: 0.4,
                },
                {
                  x: ["2021", "2022", "2023", "2024", "2025"],
                  y: [20, 60, 30, 45, 35],
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
            />
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}