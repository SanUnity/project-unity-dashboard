import React from "react"
import { Card, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

const StatsCard = ({className, hideChart, iconRight, bg, icon, stat, statTitle, options, series, type, height}) => { 

  return(
    <Card>
        <CardBody
          className={`${className ? className : "stats-card-body"} d-flex ${
            !iconRight && !hideChart
              ? "flex-column align-items-start"
              : iconRight
              ? "justify-content-between flex-row-reverse align-items-center"
              : hideChart && !iconRight
              ? "justify-content-center flex-column text-center"
              : null
          } ${!hideChart ? "pb-0" : "pb-2"} pt-2`}
        >
          <div className="icon-section">
            <div className={`avatar avatar-stats p-50 m-0 align-items-center`} style={ {backgroundColor: bg ? bg+"44" : "#028fb644", height: "48px", width: "48px"}}>
              <img alt="avatar-img" className="avatar-content" src={icon}></img>
            </div>
          </div>
          <div className="title-section">
            <h2 className="text-bold-600 mt-2 mb-25">{stat}</h2>
            <p className="mb-0">{statTitle}</p>
          </div>
        </CardBody>
        {!hideChart && (
          <Chart
            options={options}
            series={series}
            type={type}
            height={height ? height : 100}
          />
        )}
      </Card>
  )
}

export default StatsCard
