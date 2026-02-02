import Plotly from 'react-plotly.js';
import MainCard from '../components/MainCard.jsx';
import SecCard from '../components/SecCard.jsx';

export default function ProgramDashboard() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-12 gap-2'>
      <MainCard number="37" title="Total Programs"/>
      <SecCard number="20" percent="12%" title="Completed Programs"/>
      <SecCard number="10" percent="8%" title="Ongoing Programs"/>
      <SecCard number="7" percent="5%" title="Upcoming Programs"/>
      
      <div className='col-span-5'>
        <div className='bg-white flex flex-wrap h-96 rounded-[1vw] inset-shadow-xl shadow-xl'>
          <div className=' bg-gray-200 text-xl w-full rounded-t-[1vw] align-middle pt-2 pl-4'>Dashboard</div>
              <Plotly data={[
                {
                  values: [20, 22, 24, 34],
                  labels: ['Type1', 'Type2', 'Type3', 'Type4'],
                  hoverinfo: 'label+value+percent',
                  hole: .6,
                  type: 'pie',

                },
              ]} layout={
                  {width: 460, height: 330, plot_bgcolor: 'rgba(5,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                    margin: {l: 50, r: 15, b: 15, t: 15}, xaxis: {gridcolor: 'rgba(25,31,52,0)'},
                    yaxis: {automargin: true, gridcolor: 'rgba(25,31,52,0.4)'}, 
                    // annotations: [{font: {size: 20},
                    // showarrow: false,
                    // x: 0.17,
                    // y: 0.5,}]
                  }}
                config = {{responsive: true, displaylogo: false}}/> 
          </div>

          <div className='grid grid-cols-5'>
            <div className='bg-white inset-shadow-lg rounded-lg shadow-xl mt-2 mr-1 pt-4 pl-4 col-span-3'>
              <div className='grid grid-cols-3 h-full'>
                <div className='bg-green-500/50 col-span-1 rounded-lg h-12 w-16'></div>
                <div className='col-span-2 gap-y-0 pt-16'>
                  <p className='text-xl font-sans text-right font-[650] pr-4 align-bottom'>₱23,857,097,980.95</p>
                  <p className='text-right font-sans text-xs font-medium pr-4 align-top'>Total Approved Program Budget</p>
                </div>
              </div>
            </div>
            
            <div className='bg-white inset-shadow-lg rounded-lg shadow-xl h-37 pt-4 pl-4 mt-2 ml-1 col-span-2'>
                <div className='bg-green-500/50 rounded-lg h-12 w-16'></div>
                <div className='pt-2'>
                  <p className='text-base font-sans text-right font-[650] pr-4 align-bottom'>₱23,857,097,980.95</p>
                  <p className='text-right font-sans text-xs font-medium pr-4 align-top'>Total Approved Program Budget</p>
                </div>
            </div>
          </div>
      </div>
      
      <div className='col-span-7'>
          <div className='flex flex-wrap bg-white inset-shadow-lg h-66 rounded-[1vw] shadow-xl'>
            <div className=' bg-gray-200 text-xl w-full h-12 rounded-t-[1vw] align-middle pt-2 pl-4'>Dashboard</div>
            <Plotly 
                data={[
                  {type: 'bar', width: 0.4, x: ['Type 1', 'Type 2', 'Type 3'], y: [2, 5, 3]},
                  {
                    x: ['Type 1', 'Type 2', 'Type 3'],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                  },
                  ]}
                  layout={ {width: 600, height: 160, barcornerradius: 10,
                    plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', margin: {l: 50, r: 0, b: 0, t: 25, pad: 4
                  }} }
                  config = {{responsive: true, displaylogo: false}}
            />
          </div>

          <div className='flex flex-wrap bg-white inset-shadow-lg h-67 mt-2 rounded-[1vw] shadow-xl'>
            <div className='bg-gray-200 text-xl w-full h-12 rounded-t-[1vw] align-middle pt-2 pl-4'>Dashboard</div>
              <Plotly 
                data={[
                  {
                    x: ['Type 1', 'Type 2', 'Type 3'],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                  },
                  {type: 'bar', x: ['Type 1', 'Type 2', 'Type 3'], y: [2, 5, 3]},
                  ]}
                  layout={ {width: 600, height: 140, title: {text: 'A Fancy Plot'}, 
                    plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', margin: {l: 50, r: 0, b: 0, t: 30, pad: 4
                  }} }
                  config = {{responsive: true}}
            />
          </div>
        </div>
    </div>
    
  );
}