import { useMemo } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { modelMetrics, modelPerformance } from '../data/mockData.js';

const radarData = [
  { metric: 'Accuracy', value: 94 },
  { metric: 'Precision', value: 90 },
  { metric: 'Recall', value: 88 },
  { metric: 'F1', value: 89 },
  { metric: 'ROC-AUC', value: 92 },
];

export default function ModelPerformancePage() {
  const averageScores = useMemo(() => ({
    accuracy: (modelMetrics.reduce((sum, item) => sum + item.accuracy, 0) / modelMetrics.length).toFixed(1),
    precision: (modelMetrics.reduce((sum, item) => sum + item.precision, 0) / modelMetrics.length).toFixed(1),
    recall: (modelMetrics.reduce((sum, item) => sum + item.recall, 0) / modelMetrics.length).toFixed(1),
    f1: (modelMetrics.reduce((sum, item) => sum + item.f1, 0) / modelMetrics.length).toFixed(1),
    rocAuc: (modelMetrics.reduce((sum, item) => sum + item.rocAuc, 0) / modelMetrics.length).toFixed(1),
  }), []);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <div className="eyebrow"><span className="live-pulse" /> MODEL MONITORING</div>
          <h2>Model Performance</h2>
          <p>Demo model metrics – replace with production model results.</p>
        </div>
      </div>

      <div className="stats-row model-kpi-row">
        <div className="mini-stat"><span>Avg Accuracy</span><strong>{averageScores.accuracy}%</strong></div>
        <div className="mini-stat"><span>Avg Precision</span><strong>{averageScores.precision}%</strong></div>
        <div className="mini-stat"><span>Avg Recall</span><strong>{averageScores.recall}%</strong></div>
        <div className="mini-stat"><span>Avg F1</span><strong>{averageScores.f1}%</strong></div>
        <div className="mini-stat"><span>Avg ROC-AUC</span><strong>{averageScores.rocAuc}%</strong></div>
      </div>

      <div className="page-chart-grid">
        <div className="detail-card chart-card-full">
          <h3>ROC-AUC Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={modelPerformance.rocCurve}>
              <CartesianGrid stroke="#edf0f3" vertical={false} />
              <XAxis dataKey="fpr" tickFormatter={(value) => `${value.toFixed(1)}`} />
              <YAxis domain={[0, 1]} tickFormatter={(value) => `${value}`} />
              <Tooltip />
              <Line type="monotone" dataKey="tpr" stroke="#167d75" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="detail-card chart-card-full">
          <h3>Precision vs Recall</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={modelPerformance.precisionRecall}>
              <CartesianGrid stroke="#edf0f3" vertical={false} />
              <XAxis dataKey="threshold" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="precision" stroke="#4f7ff7" strokeWidth={2.3} />
              <Line type="monotone" dataKey="recall" stroke="#d96d57" strokeWidth={2.3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="detail-card chart-card-full full-span">
          <h3>Model Quality Snapshot</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar dataKey="value" stroke="#167d75" fill="#167d75" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="detail-card model-card-grid">
        {modelMetrics.map((model) => (
          <div key={model.name} className="model-tile">
            <div className="model-head">
              <strong>{model.name}</strong>
              <span>{model.version}</span>
            </div>
            <dl>
              <div><dt>Accuracy</dt><dd>{model.accuracy}%</dd></div>
              <div><dt>Precision</dt><dd>{model.precision}%</dd></div>
              <div><dt>Recall</dt><dd>{model.recall}%</dd></div>
              <div><dt>F1 Score</dt><dd>{model.f1}%</dd></div>
              <div><dt>ROC-AUC</dt><dd>{model.rocAuc}%</dd></div>
            </dl>
            <div className="model-footer">
              <span>Last trained: {model.trained}</span>
              <span>{model.dataset}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
