import React from "react"
import { Card, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

const DonutChart = ({ series, colors, labels, type, customHeight, gender }) => {

    const options = {
        dataLabels: { enabled: true },
        legend: { show: false },
        tooltip: { enabled: false },
        colors: colors,
        fill: {
            type: "gradient",
            gradient: {
                enabled: true,
                type: "vertical",
                gradientToColors: colors.map((color) =>  color+"AA" ),
                inverseColors: false,
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: 0,
                endAngle: gender ? 270 : 360,
            }
        },
        stroke: {
            lineCap: "round",
            width: type === "pie" ? 3 : 0
        },
        labels: labels
    }
    return (
        <Card>
            {series && 
            <CardBody className="pt-0">
                <Chart
                    options={options}
                    series={series}
                    type={type}
                    height={customHeight ? ( type === "donut" ? customHeight : customHeight+8) : "auto"}
                />
                {series && series.map((serie,index) => (
                    <div key={index} className="chart-info d-flex justify-content-center mb-1 mt-3">
                        <div className="series-info d-flex align-items-center">
                            <span className="label">{labels[index]}</span>
                            <span className="align-middle data">{serie}%</span>
                            <div className="info-data-color" style={{ border: `solid 4px ${colors[index]}` }}/>
                        </div>
                    </div>
                ))}
            </CardBody>
            }
      </Card>
    )
}

export default DonutChart