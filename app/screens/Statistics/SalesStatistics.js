import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { BarChart } from 'react-native-chart-kit';
import CustomSpinner from '../../customComponents/CustomSpinner';
import BackendData from '../../utilities/BackendData';
import axios from 'axios';
import { Dimensions } from 'react-native';
import { PublicStyles } from '../../styles/PublicStyles';
import { useTranslation } from 'react-i18next';
import ItemSkeletion from '../Skeletons/ItemSkeletion';
import { Div,Text } from 'react-native-magnus';

export default function SalesStatistics() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
    const [loading, setLoading] = useState(true);
  
    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BackendData.url}sales/statics`);

                const branches = response.data.filter(branch => branch.name !== null); // Filter out entries with null names
                const labels = branches.map(branch => branch.name);
                const data = branches.map(branch => branch.count || 0);

                setChartData({
                    labels: labels,
                    datasets: [{
                        data: data,

                        color: () => (theme === 'light' ? '#14213d' : '#CCFF00'),
                    }],
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <Div>
            

            <Text fontWeight='bold' textAlign='center' my={10}> {t('sales-statistics')} </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10, borderRadius: 10, }}>
                {loading ? (
    
                    <ItemSkeletion />
                ) : (

                    <BarChart
                        data={chartData}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={{
                            backgroundColor:  '#fff',
                            backgroundGradientFrom:  '#4c0054',
                            backgroundGradientTo:  '#4c0054',
                            decimalPlaces: 0,
                            color: () => '#fff',
                            labelColor: () => '#fff',
                            style: {
                                borderRadius: 10,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 10,
                            width: '100%',
                        }}
                    />

                )}
            </ScrollView>
        </Div>
    )
}
