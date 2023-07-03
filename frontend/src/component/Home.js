import '../styles/GlobalStyles.css';
import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";
import {Typography, Grid, Card, CardContent, Tab, Tabs, colors} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {BarChart} from "@mui/x-charts";
import echarts from "echarts";
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center',
        padding: theme.spacing(2),
    },
    card: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));
const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
const Home = () => {
    const classes = useStyles();
    const [productRegData, setProductRegData] = useState(null);
    const [selectedYear, setSelectedYear] = useState("2023"); // 초기 선택 연도 설정
    const [productViewData, setProductViewData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchProductBarChart();
        fetchProductDoughnutChart();
    }, []);

    const fetchProductBarChart = () => {
        axios
            .get('/api/productRegdate')
            .then((response) => {
                const data = response.data;
                const newData = {};

                data.forEach((item) => {
                    const year = item.year;
                    const month = item.month;
                    const count = item.count_by_year_month;

                    if (!newData[year]) {
                        newData[year] = {
                            xAxis: [{ scaleType: 'band', data: [] }],
                            series: [{ data: [] }],
                        };
                    }

                    newData[year].xAxis[0].data.push(month);
                    newData[year].series[0].data.push(count);
                });

                // Fill in missing months with 0 count
                Object.values(newData).forEach((yearData) => {
                    const xAxisData = yearData.xAxis[0].data;
                    const seriesData = yearData.series[0].data;
                    const allMonths = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

                    allMonths.forEach((month) => {
                        if (!xAxisData.includes(month)) {
                            xAxisData.push(month);
                            seriesData.push(0);
                        }
                    });

                    // Sort data by month
                    const sortedIndices = xAxisData.map((_, index) => index).sort((a, b) => xAxisData[a].localeCompare(xAxisData[b]));
                    yearData.xAxis[0].data = sortedIndices.map((index) => xAxisData[index]);
                    yearData.series[0].data = sortedIndices.map((index) => seriesData[index]);
                });


                setProductRegData(newData);
            })
            .catch((error) => {
                console.error('Failed to fetch board regdate:', error);
            });
    };

    const fetchProductDoughnutChart = () => {
        axios
            .get('/api/productViewcount')
            .then((response) => {
                const data = response.data;
                console.log("viewcountList:", data);
                const newData = {
                    labels: [],
                    datasets: []  // 초기값을 빈 배열로 설정
                };

                const dataset = {
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                };

                data.forEach((item) => {
                    const category = item.product_category;
                    const count = item.total_viewcount;
                    console.log("카테고리:", category, "||", "개수:", count);
                    newData.labels.push(category);
                    dataset.data.push(count);
                });

                newData.datasets.push(dataset);  // 데이터셋을 추가

                setProductViewData(newData);
                // setIsDataLoaded(true); // 데이터 로드가 완료되었음을 표시
            })
            .catch((error) => {
                console.error('fail', error);
            })
            .finally(() => {
                setIsLoading(false); // 로딩 상태 변경
            });
    };



    const handleYearChange = (event, newValue) => {
        setSelectedYear(newValue);
    };

    return (
        <div className={classes.container}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="body1">
                                <Tabs value={selectedYear} onChange={handleYearChange} aria-label="Year Tabs">
                                    <Tab label="2020" value="2020" />
                                    <Tab label="2021" value="2021" />
                                    <Tab label="2022" value="2022" />
                                    <Tab label="2023" value="2023" />
                                </Tabs>
                                <div className={classes.chartContainer}>
                                    {productRegData && (
                                        <BarChart
                                            xAxis={productRegData[selectedYear].xAxis}
                                            series={productRegData[selectedYear].series}
                                            width={420}
                                            height={300}
                                        />
                                    )}
                                    <br/>
                                    <div>전체상품 등록개수(년/월)</div>
                                    <div className="chart-type">MUI Barchart</div>
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="body1">
                                <div className={classes.chartContainer} style={{ width: '90%', height: '430px' }}>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <Doughnut data={productViewData} width="100%" height="100%" />
                                    )}
                                    <br/>
                                    <div>상품 분류 별 조회 TOP10</div>
                                    <div className="chart-type">ChartJS Doughnutchart</div>
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;

