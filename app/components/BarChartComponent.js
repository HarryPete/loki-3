'use client'

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

const BarChartComponent = ({data, xLabel, yLabel, title, CustomTooltip}) => 
{	

	return (
		<motion.div
			className=' flex flex-col justify-between bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold mb-4 text-center'>{title}</h2>

			<div className='h-60'>
				<ResponsiveContainer>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey={xLabel} stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip contentStyle={{color: 'black'}} content={<CustomTooltip/>}/>
						<Bar dataKey={yLabel} fill='#6366F1' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default BarChartComponent;