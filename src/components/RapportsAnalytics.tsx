import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";
import { Zap, TrendingUp, Activity, Award, Download } from "lucide-react";

export default function RapportsAnalytics() {
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportSuccess, setExportSuccess] = React.useState(false);

  // Chart 1: Sprint Velocity History
  const sprintData = [
    { name: "Sprint 1", velocity: 45, compl: 80 },
    { name: "Sprint 2", velocity: 58, compl: 85 },
    { name: "Sprint 3", velocity: 64, compl: 90 },
    { name: "Sprint 4", velocity: 78, compl: 94 },
    { name: "Sprint 5", velocity: 84, compl: 88 },
  ];

  // Chart 2: Contributor Accomplishments
  const contributorData = [
    { name: "Julian P.", done: 14, inprogress: 3 },
    { name: "Elara V.", done: 11, inprogress: 2 },
    { name: "Maya L.", done: 8, inprogress: 1 },
  ];

  const exportReport = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Format current timestamp in French
      const todayStr = new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      // ----------------------------------------------------
      // HEADER SECTION
      // ----------------------------------------------------
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor("#00C969"); // Emerald accent
      doc.text("WORKSPACE / CONGO TECH LAB / SPRINTS", 20, 20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor("#0f172a"); // Dark slate primary text
      doc.text("Rapports & Statistiques Sprints", 20, 29);

      // Accent color bar under title
      doc.setFillColor("#00C969");
      doc.rect(20, 33, 170, 1.2, "F");

      // Generated timestamp
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor("#64748b");
      doc.text(`Généré le ${todayStr}`, 190, 20, { align: "right" });

      // ----------------------------------------------------
      // KPI CARDS SECTION (y = 39 to 65)
      // ----------------------------------------------------
      const cardY = 39;
      const cardW = 52;
      const cardH = 26;
      const cardGap = 7;

      // Card 1: Vélocité Finale
      const x1 = 20;
      doc.setDrawColor("#e2e8f0");
      doc.setFillColor("#f8fafc");
      doc.roundedRect(x1, cardY, cardW, cardH, 3, 3, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor("#64748b");
      doc.text("VÉLOCITÉ FINALE", x1 + 5, cardY + 6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor("#0f172a");
      doc.text("84 pts", x1 + 5, cardY + 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor("#10b981");
      doc.text("+14% par rapport à l'objectif", x1 + 5, cardY + 21);

      // Card 2: Taux d'Achevement
      const x2 = x1 + cardW + cardGap; // 20 + 52 + 7 = 79
      doc.setDrawColor("#e2e8f0");
      doc.setFillColor("#f8fafc");
      doc.roundedRect(x2, cardY, cardW, cardH, 3, 3, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor("#64748b");
      doc.text("TAUX D'ACHÈVEMENT", x2 + 5, cardY + 6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor("#00C969");
      doc.text("88%", x2 + 5, cardY + 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor("#64748b");
      doc.text("Sprint Alpha - Semaine 2", x2 + 5, cardY + 21);

      // Card 3: Temps Cycle Moyen
      const x3 = x2 + cardW + cardGap; // 79 + 52 + 7 = 138
      doc.setDrawColor("#e2e8f0");
      doc.setFillColor("#f8fafc");
      doc.roundedRect(x3, cardY, cardW, cardH, 3, 3, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor("#64748b");
      doc.text("TEMPS CYCLE MOYEN", x3 + 5, cardY + 6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor("#0f172a");
      doc.text("3.2 jours", x3 + 5, cardY + 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor("#64748b");
      doc.text("Durée moyenne / tâche", x3 + 5, cardY + 21);

      // ----------------------------------------------------
      // SECTION 1: SPRINT HISTORICAL VELOCITY
      // ----------------------------------------------------
      const sec1Y = 74;
      doc.setFillColor("#00C969");
      doc.rect(20, sec1Y, 3.5, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#0f172a");
      doc.text("1. Vélocité Historique des Sprints", 26, sec1Y + 4);

      // Left Chart Bounding Box
      const chart1X = 20;
      const chart1Y = 86;
      const chart1W = 75;
      const chart1H = 32;

      // Draw Grid & Axes
      doc.setDrawColor("#e2e8f0");
      doc.setLineWidth(0.2);
      // Horizontal Grid lines
      doc.line(chart1X, chart1Y, chart1X + chart1W, chart1Y);
      doc.line(chart1X, chart1Y + chart1H / 2, chart1X + chart1W, chart1Y + chart1H / 2);
      doc.line(chart1X, chart1Y + chart1H, chart1X + chart1W, chart1Y + chart1H);

      // Y-Axis Ticks Label
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor("#64748b");
      doc.text("100", chart1X - 2, chart1Y + 1, { align: "right" });
      doc.text("50", chart1X - 2, chart1Y + chart1H / 2 + 1, { align: "right" });
      doc.text("0", chart1X - 2, chart1Y + chart1H + 1, { align: "right" });

      // Draw data line for Sprint Velocity
      const sprintPoints = [
        { name: "S1", val: 45 },
        { name: "S2", val: 58 },
        { name: "S3", val: 64 },
        { name: "S4", val: 78 },
        { name: "S5", val: 84 },
      ];

      const getChart1Y = (val: number) => chart1Y + chart1H - (val / 100) * chart1H;
      const getChart1X = (index: number) => chart1X + 5 + index * ((chart1W - 10) / 4);

      // Draw Line
      doc.setDrawColor("#00C969");
      doc.setLineWidth(1.2);
      
      for (let i = 0; i < sprintPoints.length; i++) {
        const px = getChart1X(i);
        const py = getChart1Y(sprintPoints[i].val);

        if (i < sprintPoints.length - 1) {
          const nx = getChart1X(i + 1);
          const ny = getChart1Y(sprintPoints[i + 1].val);
          doc.line(px, py, nx, ny);
        }

        // Label under X axis
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor("#64748b");
        doc.text(sprintPoints[i].name, px, chart1Y + chart1H + 4, { align: "center" });
        doc.text(`${sprintPoints[i].val} pts`, px, py - 2.5, { align: "center" });

        // Node Circle
        doc.setFillColor("#00C969");
        doc.circle(px, py, 1.2, "F");
      }

      // Title/Description for the chart
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor("#0f172a");
      doc.text("Évolution de la Vélocité", chart1X, chart1Y - 3);

      // Right Side: Sprint Data Table
      const table1X = 105;
      const table1Y = 83;
      const table1W = 85;
      const rowH = 5.2;
      
      // Table Header
      doc.setFillColor("#0f172a");
      doc.rect(table1X, table1Y, table1W, 6, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor("#ffffff");
      doc.text("Sprint", table1X + 4, table1Y + 4.2);
      doc.text("Vélocité (pts)", table1X + 30, table1Y + 4.2);
      doc.text("Complétion (%)", table1X + 60, table1Y + 4.2);

      // Table Rows
      sprintData.forEach((row, i) => {
        const curY = table1Y + 6 + i * rowH;
        // Background striping
        doc.setFillColor(i % 2 === 0 ? "#f8fafc" : "#ffffff");
        doc.rect(table1X, curY, table1W, rowH, "F");
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor("#334155");
        doc.text(row.name, table1X + 4, curY + 3.8);
        doc.text(`${row.velocity} pts`, table1X + 30, curY + 3.8);
        doc.text(`${row.compl}%`, table1X + 60, curY + 3.8);

        // Underline row
        doc.setDrawColor("#f1f5f9");
        doc.setLineWidth(0.2);
        doc.line(table1X, curY + rowH, table1X + table1W, curY + rowH);
      });

      // ----------------------------------------------------
      // SECTION 2: CONTRIBUTOR TASK CONTRIBUTION
      // ----------------------------------------------------
      const sec2Y = 127;
      doc.setFillColor("#00C969");
      doc.rect(20, sec2Y, 3.5, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#0f172a");
      doc.text("2. Répartition du Travail par Collaborateur", 26, sec2Y + 4);

      // Left Side: Bar Chart
      const chart2X = 20;
      const chart2Y = 139;
      const chart2W = 75;
      const chart2H = 32;

      // Draw Grid & Axes
      doc.setDrawColor("#e2e8f0");
      doc.setLineWidth(0.2);
      doc.line(chart2X, chart2Y, chart2X + chart2W, chart2Y);
      doc.line(chart2X, chart2Y + chart2H / 2, chart2X + chart2W, chart2Y + chart2H / 2);
      doc.line(chart2X, chart2Y + chart2H, chart2X + chart2W, chart2Y + chart2H);

      // Y-Axis Ticks Label
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor("#64748b");
      doc.text("15", chart2X - 2, chart2Y + 1, { align: "right" });
      doc.text("8", chart2X - 2, chart2Y + chart2H / 2 + 1, { align: "right" });
      doc.text("0", chart2X - 2, chart2Y + chart2H + 1, { align: "right" });

      // Plot bars for contributors
      const barPoints = [
        { name: "Julian P.", done: 14, inprogress: 3 },
        { name: "Elara V.", done: 11, inprogress: 2 },
        { name: "Maya L.", done: 8, inprogress: 1 },
      ];

      const maxVal = 15;
      const getChart2Y = (val: number) => chart2Y + chart2H - (val / maxVal) * chart2H;
      const singleBarW = 5.5;

      barPoints.forEach((p, i) => {
        // Compute x coordinate of the group
        const groupX = chart2X + 8 + i * ((chart2W - 16) / 2);

        // Done bar (Emerald)
        const doneH = (p.done / maxVal) * chart2H;
        const doneY = getChart2Y(p.done);
        doc.setFillColor("#00C969");
        doc.rect(groupX, doneY, singleBarW, doneH, "F");

        // In progress bar (Indigo)
        const ipH = (p.inprogress / maxVal) * chart2H;
        const ipY = getChart2Y(p.inprogress);
        doc.setFillColor("#4f46e5");
        doc.rect(groupX + singleBarW + 1, ipY, singleBarW, ipH, "F");

        // Label under X axis
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor("#64748b");
        doc.text(p.name, groupX + singleBarW, chart2Y + chart2H + 4, { align: "center" });

        // Done count text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor("#00C969");
        doc.text(`${p.done}`, groupX + singleBarW / 2, doneY - 1.5, { align: "center" });
      });

      // Chart Title & Legend
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor("#0f172a");
      doc.text("Tâches par Collaborateur", chart2X, chart2Y - 3);

      // Legend
      doc.setFillColor("#00C969");
      doc.rect(chart2X + 38, chart2Y - 5.5, 2.5, 2.5, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor("#64748b");
      doc.text("Terminé", chart2X + 42, chart2Y - 3.5);

      doc.setFillColor("#4f46e5");
      doc.rect(chart2X + 56, chart2Y - 5.5, 2.5, 2.5, "F");
      doc.text("En cours", chart2X + 60, chart2Y - 3.5);

      // Right Side Table
      const table2X = 105;
      const table2Y = 135;
      const table2W = 85;

      // Table Header
      doc.setFillColor("#0f172a");
      doc.rect(table2X, table2Y, table2W, 6, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor("#ffffff");
      doc.text("Collaborateur", table2X + 4, table2Y + 4.2);
      doc.text("Terminé", table2X + 32, table2Y + 4.2);
      doc.text("En cours", table2X + 52, table2Y + 4.2);
      doc.text("Total", table2X + 72, table2Y + 4.2);

      // Table Rows
      barPoints.forEach((row, i) => {
        const curY = table2Y + 6 + i * rowH;
        // Background striping
        doc.setFillColor(i % 2 === 0 ? "#f8fafc" : "#ffffff");
        doc.rect(table2X, curY, table2W, rowH, "F");

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor("#334155");
        doc.text(row.name, table2X + 4, curY + 3.8);
        doc.text(`${row.done} t.`, table2X + 32, curY + 3.8);
        doc.text(`${row.inprogress} t.`, table2X + 52, curY + 3.8);
        doc.setFont("helvetica", "bold");
        doc.text(`${row.done + row.inprogress}`, table2X + 72, curY + 3.8);

        // Underline row
        doc.setDrawColor("#f1f5f9");
        doc.setLineWidth(0.2);
        doc.line(table2X, curY + rowH, table2X + table2W, curY + rowH);
      });

      // ----------------------------------------------------
      // SECTION 3: TEAM PERFORMANCE TABLE (FULL WIDTH)
      // ----------------------------------------------------
      const sec3Y = 180;
      doc.setFillColor("#00C969");
      doc.rect(20, sec3Y, 3.5, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#0f172a");
      doc.text("3. Tableau d'Honneur de l'Équipe", 26, sec3Y + 4);

      const table3X = 20;
      const table3Y = 189;
      const table3W = 170;
      const table3RowH = 6.5;

      // Table Header
      doc.setFillColor("#0f172a");
      doc.rect(table3X, table3Y, table3W, 7, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor("#ffffff");
      doc.text("Rang", table3X + 4, table3Y + 4.8);
      doc.text("Nom complet", table3X + 16, table3Y + 4.8);
      doc.text("Rôle principal", table3X + 60, table3Y + 4.8);
      doc.text("Vélocité Individuelle", table3X + 105, table3Y + 4.8);
      doc.text("Tâches accomplies", table3X + 142, table3Y + 4.8);

      // Data Row items
      const perfData = [
        { rang: "1", name: "Julian Pierce", role: "Tech Lead", velocity: "34 pts", tasks: "14 tâches" },
        { rang: "2", name: "Elara Vance", role: "Director", velocity: "28 pts", tasks: "11 tâches" },
        { rang: "3", name: "Maya Lin", role: "Talent Mgr", velocity: "22 pts", tasks: "8 tâches" },
      ];

      perfData.forEach((row, i) => {
        const curY = table3Y + 7 + i * table3RowH;
        // Striping
        doc.setFillColor(i % 2 === 0 ? "#f8fafc" : "#ffffff");
        doc.rect(table3X, curY, table3W, table3RowH, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor("#475569");
        doc.text(row.rang, table3X + 4, curY + 4.5);

        doc.setFont("helvetica", "bold");
        doc.setTextColor("#0f172a");
        doc.text(row.name, table3X + 16, curY + 4.5);

        doc.setFont("helvetica", "normal");
        doc.setTextColor("#4f46e5");
        doc.text(row.role, table3X + 60, curY + 4.5);

        doc.setFont("helvetica", "normal");
        doc.setTextColor("#0f172a");
        doc.text(row.velocity, table3X + 105, curY + 4.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#00C969");
        doc.text(row.tasks, table3X + 142, curY + 4.5);

        // Border below
        doc.setDrawColor("#e2e8f0");
        doc.setLineWidth(0.2);
        doc.line(table3X, curY + table3RowH, table3X + table3W, curY + table3RowH);
      });

      // ----------------------------------------------------
      // FOOTER SECTION
      // ----------------------------------------------------
      const footerY = 278;
      doc.setDrawColor("#e2e8f0");
      doc.setLineWidth(0.4);
      doc.line(20, footerY - 5, 190, footerY - 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor("#94a3b8");
      doc.text("Bénin Tech Hub — Rapport de Performance Officiel Sprints (Confidentiel)", 20, footerY);
      doc.text("Page 1 de 1", 190, footerY, { align: "right" });

      // Save PDF file
      doc.save("BeninTechHub_Rapport_Analytics.pdf");

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (error) {
      console.error("Erreur lors de l'exportation du PDF :", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 max-w-7xl mx-auto text-text-main">
      {exportSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Le document PDF <strong>BeninTechHub_Rapport_Analytics.pdf</strong> a été généré et téléchargé avec succès !</span>
          </div>
        </div>
      )}

      {/* Top Header details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm text-text-dim">Workspace / Bénin Tech Hub / Sprints</h3>
          <p className="text-lg font-bold text-text-main font-sans">Rapports & Statistiques Sprints</p>
        </div>
        <button
          onClick={exportReport}
          disabled={isExporting}
          className={`h-9 px-4 rounded-lg bg-bg-card border border-border-main text-text-sub font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer hover:bg-bg-hover ${
            isExporting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isExporting ? (
            <div className="w-4 h-4 border-2 border-gray-500 border-t-emerald-400 rounded-full animate-spin" />
          ) : (
            <Download className="w-4 h-4 text-emerald-400" />
          )}
          <span>{isExporting ? "Génération en cours..." : "Exporter le PDF"}</span>
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-2">
          <div className="flex items-center justify-between text-xs text-text-dim font-mono">
            <span>VELOCITE FINALE</span>
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-black text-text-main font-mono">84 pts</p>
          <span className="text-[10px] text-emerald-400 block">+14% par rapport à l'objectif initial</span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-2">
          <div className="flex items-center justify-between text-xs text-text-dim font-mono">
            <span>TAUX D'ACHEVEMENT</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-accent font-mono">88%</p>
          <span className="text-[10px] text-text-dim block">Sprint Alpha - Semaine 2</span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-2">
          <div className="flex items-center justify-between text-xs text-text-dim font-mono">
            <span>TEMPS CYCLE MOYEN</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-black text-text-main font-mono">3.2 jours</p>
          <span className="text-[10px] text-text-dim block">Durée moyenne d'une tâche critique</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sprint Velocity Area Chart */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
          <div>
            <h4 className="text-sm font-bold text-text-main">Vélocité Historique des Sprints</h4>
            <p className="text-xs text-text-dim">Points accomplis par sprint de 2 semaines</p>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sprintData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C969" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00C969" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", borderRadius: "12px", fontSize: "11px", color: "var(--text-primary)" }}
                  labelStyle={{ color: "var(--text-primary)", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="velocity" stroke="#00C969" strokeWidth={2} fillOpacity={1} fill="url(#colorVelocity)" name="Vélocité (pts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contributor Task Contribution Bar Chart */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
          <div>
            <h4 className="text-sm font-bold text-text-main">Répartition des Tâches par Collaborateur</h4>
            <p className="text-xs text-text-dim">Volume de travail accompli et en cours</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contributorData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", borderRadius: "12px", fontSize: "11px", color: "var(--text-primary)" }}
                  labelStyle={{ color: "var(--text-primary)", fontWeight: "bold" }}
                />
                <Bar dataKey="done" fill="#00C969" radius={[4, 4, 0, 0]} name="Terminé" />
                <Bar dataKey="inprogress" fill="#4f46e5" radius={[4, 4, 0, 0]} name="En cours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity table / Top Performers */}
      <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
        <div className="flex items-center justify-between border-b border-border-sub pb-3">
          <div>
            <h4 className="text-sm font-bold text-text-main">Performances de l'Équipe</h4>
            <p className="text-xs text-text-dim">Membres d'équipe les plus actifs ce sprint</p>
          </div>
          <Award className="w-5 h-5 text-accent" />
        </div>

        <div className="space-y-2">
          {/* Row 1 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-bg-app border border-border-sub text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-text-dim font-mono w-4">1.</span>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                alt="Julian" 
                className="w-6 h-6 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-text-sub">Julian Pierce</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Tech Lead</span>
            </div>
            <div className="flex items-center gap-4 text-text-dim font-mono text-[11px]">
              <span>Velocity: 34 pts</span>
              <span className="text-accent font-bold">14 tâches</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-bg-app border border-border-sub text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-text-dim font-mono w-4">2.</span>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                alt="Elara" 
                className="w-6 h-6 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-text-sub">Elara Vance</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Director</span>
            </div>
            <div className="flex items-center gap-4 text-text-dim font-mono text-[11px]">
              <span>Velocity: 28 pts</span>
              <span className="text-accent font-bold">11 tâches</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-bg-app border border-border-sub text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-text-dim font-mono w-4">3.</span>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" 
                alt="Maya" 
                className="w-6 h-6 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-text-sub">Maya Lin</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Talent Mgr</span>
            </div>
            <div className="flex items-center gap-4 text-text-dim font-mono text-[11px]">
              <span>Velocity: 22 pts</span>
              <span className="text-accent font-bold">8 tâches</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
