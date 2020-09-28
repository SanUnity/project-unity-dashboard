import React from "react"
import { Card ,CardBody } from "reactstrap"
import Chart from "react-apexcharts"
import "./BarChart.css"
import DisplayUtils from "../../../utils/DisplayUtils"

const BarChart = ({ series, colors, labels, type, vertical }) => {

    var options = {
        chart: {
            sparkline: { enabled: true },
            toolbar: { show: false }
        },
        fill: {
            type: "gradient",
            gradient: {
                enabled: true,
                type: vertical ? "vertical" : "horizontal",
                gradientToColors: colors.map((color) =>  color+"AA" ),
                inverseColors: false,
            }
        },
        legend: { show: false },
        tooltip: { enabled: false },
        plotOptions: {
            bar: {
                barHeight: '75%',
                distributed: true,
                horizontal: vertical ? false : true,
                endingShape: "rounded",
                columnWidth: vertical ? '75%' : '100%',
                dataLabels: {
                    position: vertical ? 'top' : 'bottom'
                },
            }
        },
        colors: colors,
        dataLabels: {
            enabled: true,
            offsetX: vertical ? 0 : 10,
            offsetY: vertical ? 0 : 0,
            style: {
                fontSize: vertical ? '12px' : '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: '600',
                colors: vertical ? ["#000"] : ["#fff"]
            },
            formatter: function (val, opt) {
                return vertical ? val + "%" : val
            }
        },
        xaxis: {
            categories: ['Enfermedad crónica', 'Falta de aire', 'Fiebre', 'Tos', 'Contacto estrecho', 'Mucosidad', 'Dolor muscular', 'Gastrointestinal', 'Pérdida de olfato'],
        }
    };

    return (
        <Card className={DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? "p-0" : ""}>
            <CardBody className={`${vertical && " vertical"} pt-0 bar-chart`}>
                <Chart
                    options={options}
                    series={[{data: series.map((serie) =>  serie.toFixed(serie % 1 && 1) )}]}
                    type={type}
                    height={"255px"}
                />
                {series.map((serie,index) => (
                    <div key={index} className="chart-info d-flex justify-content-center mb-1 mt-3">
                        <div className="series-info d-flex align-items-center">
                            <span className="mx-50 label">{labels[index]}</span>
                            <span className="align-middle data">{serie.toFixed(serie % 1 && 1)}{vertical && "%"}</span>
                            <div className="info-data-color" style={{ border: `solid 4px ${colors[index]}` }}/>
                        </div>
                    </div>
                ))}
            </CardBody>
      </Card>
    )
}

export default BarChart