import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { PieChart } from 'react-native-chart-kit';
import CustomSpinner from '../../customComponents/CustomSpinner';
import BackendData from '../../utilities/BackendData';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import { Div,Text } from 'react-native-magnus';
import ItemSkeletion from '../Skeletons/ItemSkeletion';


export default function ProblemStatistics() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BackendData.url}problems/statistics`);
                

                const branches = response.data.filter(branch => branch.name !== null); // Filter out entries with null names
                const labels = branches.map(branch => branch.name || 'Unknown'); // Default label if name is null
                const data = branches.map(branch => branch.count || 0); // Ensure count is a number

                // Ensure data is valid before setting it
                if (labels.length > 0 && data.length > 0) {
                    setChartData({
                        labels: labels,
                        data: data,
                    });
                } else {
               
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


      
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  const pieChartData = chartData.labels.map((label, index) => ({
      name: label,
      population: chartData.data[index],
      color: colors[index % colors.length], // Cycle through colors array
      legendFontColor: '#fff',
      legendFontSize: 15,
  }));



  return (
      <Div >
            
            <Text fontWeight='bold' textAlign='center' fontSize={16}>{t('problem-statistics')}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10, borderRadius: 10 }}>
                {loading ? (
                   
                    <ItemSkeletion />
                ) : (
                    <PieChart
                        data={pieChartData}
                        width={1000}
                        height={400}
                        chartConfig={{
                            backgroundColor:  '#fff',
                            backgroundGradientFrom:  '#CCFF00',
                            backgroundGradientTo:  '#CCFF00',
                            decimalPlaces: 0,
                            color: () => '#14213d',
                            labelColor: () => '#000',
                            style: {
                                borderRadius: 10,
                            },
                        }}
                        accessor="population"
                        style={{
                            marginVertical: 8,
                            borderRadius: 10,

                        }}
                    />
                )}
            </ScrollView>
        </Div>
  )
}
