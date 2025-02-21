'use client'

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#34D399 ", "#FB923C"];

const PieChartComponent = ({data, yLabel, title, CustomTooltip}) => 
{
	return (
		<Card
			className='p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className="text-lg font-bold text-center">{title}</h2>
			<div className='h-72'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={data}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
                            innerRadius={50}
							outerRadius={80}
							fill='#8884d8'
							dataKey={yLabel}>
							{data.map((entry, index) => (
								<Cell key={index} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip content={<CustomTooltip/>}/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
};

export default PieChartComponent;

