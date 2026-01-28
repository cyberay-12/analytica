import Plotly from 'react-plotly.js';
import MainCard from '../components/MainCard.jsx';
import SecCard from '../components/SecCard.jsx';

export default function Dashboard() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-12 gap-2'>
      <MainCard number="37" title="Total Programs"/>
      <SecCard number="20" percent="12%" title="Completed Programs"/>
      <SecCard number="10" percent="8%" title="Ongoing Programs"/>
      <SecCard number="7" percent="5%" title="Upcoming Programs"/>

      {/* <div className='bg-white/50 backdrop-blur-sm h-32 rounded-lg inset-shadow-xs shadow-sm p-3 col-span-3'>
        <div className='grid grid-cols-2 h-full'>
          <div className='bg-green-500/50 col-span-1 rounded-lg h-12 w-16'></div>
          <div className='col-span-1 pt-8'>
            <p className='text-5xl font-sans text-right font-[650] pr-4'>37</p>
            <p className='text-right font-sans text-sm pr-4'>New Users</p>
          </div>
        </div>
      </div> */}

      {/* <div className='bg-white/50 backdrop-blur-sm h-32 rounded-lg inset-shadow-xs shadow-sm p-6 col-span-3'></div>
      <div className='bg-white/50 backdrop-blur-sm h-32 rounded-lg inset-shadow-xs shadow-sm p-6 col-span-3'></div> */}
      
      <div className='col-span-5'>
        <div className='bg-slate-500 h-96 rounded-lg shadow-xl'>
          <div className='text-xl'>Dashboard</div>
              <Plotly data={[
                {
                  x: [1, 2, 3, 6, 10],
                  y: [2, 4, 6, 8, 10],
                  type: 'scatter',
                  mode: 'lines+markers',
                },
              ]} layout={
                  {width: 460, height: 330, title: 'A Fancy Plot', plot_bgcolor: 'rgba(5,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', 
                    margin: {l: 50, r: 15, b: 15, t: 15}, xaxis: {gridcolor: 'rgba(255,255,255,0.5)'},
                    yaxis: {gridcolor: 'rgba(255,255,255,0.5)'}
                  }}
                config = {{responsive: true, displaylogo: false}}/> 
          </div>

          <div className='grid grid-cols-2'>
            <div className='bg-slate-500 rounded-lg shadow-xl p-16 mt-2 mr-1'>Sample</div>
            <div className='bg-slate-500 rounded-lg shadow-xl p-16 mt-2 ml-1'>Sample</div>
          </div>
      </div>
      
      <div className='col-span-7'>
        <div className='grid grid-cols-1'>
          <div className='bg-slate-500 h-66 rounded-lg shadow-xl'>
            <div className='text-5xl'>Dashboard</div>
              <Plotly 
                data={[
                  {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                  },
                  {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                  ]}
                  layout={ {width: 600, height: 180, title: {text: 'A Fancy Plot'}, 
                    plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', margin: {l: 50, r: 0, b: 0, t: 25, pad: 4
                  }} }
                  config = {{responsive: true}}
            />
          </div>

          <div className='bg-slate-500 h-67 mt-2 rounded-lg shadow-xl'>
            <div className='text-5xl'>Dashboard</div>
              <Plotly 
                data={[
                  {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                  },
                  {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                  ]}
                  layout={ {width: 600, height: 180, title: {text: 'A Fancy Plot'}, 
                    plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', margin: {l: 50, r: 0, b: 0, t: 30, pad: 4
                  }} }
                  config = {{responsive: true}}
            />
          </div>
        </div>
      </div>
    </div>
    
  );
}