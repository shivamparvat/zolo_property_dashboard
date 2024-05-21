import CustomTable, {ActionSwitch} from "@/components/Utils/CustomTable";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js";
import {DDMMYYYY} from "@/components/Utils/Formeter";
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const Chart: React.FC<any> = ({data}) => {
  return (
    <div className="col-lg-7 mb-lg-0 mb-4">
      <div className="card z-index-2 h-100 bg-glass">
        <div className="card-header pb-0 pt-3 bg-transparent">
          <h6 className="text-capitalize">Current Month</h6>
          {/* <p className="text-sm mb-0">
            <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
            <span className="font-weight-bold">5 people Interested </span> {DDMMYYYY(new Date().toDateString())}
          </p> */}
        </div>
        <div className="card-body p-3">
          <div className="chart" style={{height: "300px"}}>
            <Line
              style={{minWidth: 'calc(100vw - 57vw)', minHeight: 'calc(100vh - 64vh)'}}
              data={{
                labels: data?.date || [],
                datasets: [{
                  label: 'Interested',
                  data: data?.interested || [],
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                },{
                  label: 'User',
                  data: data?.user || [],
                  fill: false,
                  borderColor: 'rgb(16, 111, 251)',
                  tension: 0.1
                },{
                  label: 'Properties',
                  data: data?.properties || [],
                  fill: false,
                  borderColor: 'rgba(255, 99, 132, 0.8)',
                  tension: 0.1
                }]
              }}
              options={{maintainAspectRatio: true}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
