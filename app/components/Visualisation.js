import { AreaChart, Area, LineChart, Line, PieChart, Pie,  BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Visualisation = ({visualisationData, pieData, barData}) =>
{

    const COLORS = ["#f97316", "#94a3b8", "#2196F3"];

    return(
        <div className=" space-y-4">
            <ResponsiveContainer width="100%" height={400} className="bg-slate-100 px-4 py-4 rounded-xl">
            <AreaChart data={visualisationData}>
                <defs>
                <linearGradient id="depositColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="withdrawalColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.1} />
                </linearGradient>
                </defs>

                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />

                <Area
                type="monotone"
                dataKey="Deposit"
                stroke="#f97316"
                fill="url(#depositColor)"
                strokeWidth={2}
                />
                <Area
                type="monotone"
                dataKey="Withdrawal"
                stroke="#94a3b8"
                fill="url(#withdrawalColor)"
                strokeWidth={2}
                />
            </AreaChart>
            </ResponsiveContainer>
  

            <div className="grid grid-cols-1 gap-4">
                {pieData && 
                <ResponsiveContainer width="100%" height={400} className="bg-slate-100 px-4 py-4 rounded-xl">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                                {pieData?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                        </Pie>
                        <Tooltip wrapperStyle={{ fontSize: "12px" }}/>
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                </ResponsiveContainer>}

                {/* <ResponsiveContainer width="100%" height={400} className="bg-slate-100 px-4 py-4 rounded-xl">
                    <BarChart data={barData} barGap={4} barCategoryGap="20%">
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip wrapperStyle={{ fontSize: "12px" }} />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        <Bar dataKey="Deposit" fill="#f97316" barSize={20} />
                        <Bar dataKey="Withdrawal" fill="#64748b" barSize={20} />
                    </BarChart>
                </ResponsiveContainer> */}
            </div>
        </div>
    )
}