import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { BarChart } from 'react-native-chart-kit';
import CustomSpinner from '../../customComponents/CustomSpinner';
import BackendData from '../../utilities/BackendData';
import axios from 'axios';
import { Dimensions } from 'react-native';
import InvoiceSkeleton from '../Skeletons/InvoiceSkeleton';
import ItemSkeletion from '../Skeletons/ItemSkeletion';

export default function InvoicesStatistics() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [] }] });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BackendData.url}invoices/statics`);
                console.log('API Response:', response.data); // Log the response for debugging

                const branches = response.data;

                // Map the data to extract labels and counts
                const labels = branches.map(branch => branch.branch_name);
                const data = branches.map(branch => {
                    // Ensure that invoice_count is a valid number
                    const count = typeof branch.invoice_count === 'number' ? branch.invoice_count : 0;
                    return count; // Default to 0 if not a number
                });

                setChartData({
                    labels: labels,
                    datasets: [{
                        data: data,
                        color: () => (theme === 'light' ? '#14213d' : '#CCFF00'), // Color based on theme
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop:10,borderRadius: 10,}}>
            {loading ? (
                <ItemSkeletion />  
            ) : (
                <BarChart
                    data={chartData}
                    width={Dimensions.get('window').width} 
                    height={220} 
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#4c0054',
                        backgroundGradientTo: '#4c0054',
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
    )
}
