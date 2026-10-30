/**
 * 課程大綱（按 mode 分組）。
 *
 * DSE 必修照 EDB《Explanatory Notes to Senior Secondary Mathematics Curriculum》
 * (math\dse_maths\EN_CP_e.pdf) 官方 20 個 Learning Units；
 * PRE-DSE 照 EDB《Learning Content of Junior Secondary Mathematics》(jsmc2017_e.pdf)
 * 官方 32 個 KS3 Learning Units（按三大 Strand + Further Learning Unit 排）：
 *   topic = { id, code, title, en?, strand?, hours?, units: [{ id, title, lessonId? }] }
 *   code     官方編號 (U1-U20 / K1-K32)
 *   hours    課程建議時數（只寫有原文根據嘅）
 *   units    官方 Learning Objectives 濃縮成學生睇得明嘅細項
 */

export const SYLLABUS = {
  PRE_DSE: [
    {
      id: 'k1', code: 'K1', title: '基本運算', en: 'Basic computation',
      strand: '數與代數', hours: 8,
      units: [
        { id: 'k1-divisibility', title: '整除性檢驗', lessonId: 'k1-basic', beatId: 's1' },
        { id: 'k1-power', title: '冪的概念', lessonId: 'k1-basic', beatId: 's5' },
        { id: 'k1-factorisation', title: '質因數分解', lessonId: 'k1-basic', beatId: 's9' },
        { id: 'k1-gcd-lcm', title: '最大公因數與最小公倍數', lessonId: 'k1-basic', beatId: 's13' },
        { id: 'k1-fractions', title: '分數混合運算', lessonId: 'k1-basic', beatId: 's17' },
      ],
    },
    {
      id: 'k2', code: 'K2', title: '有向數', en: 'Directed numbers',
      strand: '數與代數', hours: 9,
      units: [
        { id: 'k2-concept', title: '有向數概念', lessonId: 'k2-directed', beatId: 's1' },
        { id: 'k2-operations', title: '有向數混合運算', lessonId: 'k2-directed', beatId: 's8' },
        { id: 'k2-problems', title: '有向數應用題', lessonId: 'k2-directed', beatId: 's9' },
      ],
    },
    {
      id: 'k3', code: 'K3', title: '近似值與數值估計', en: 'Approximate values and numerical estimation',
      strand: '數與代數', hours: 6,
      units: [
        { id: 'k3-approx', title: '近似值概念', lessonId: 'k3-approx', beatId: 's1' },
        { id: 'k3-strategies', title: '估計策略', lessonId: 'k3-approx', beatId: 's5' },
        { id: 'k3-life', title: '現實生活應用', lessonId: 'k3-approx', beatId: 's6' },
      ],
    },
    {
      id: 'k4', code: 'K4', title: '有理數與無理數', en: 'Rational and irrational numbers',
      strand: '數與代數', hours: 7,
      units: [
        { id: 'k4-nth-root', title: 'n 次方根', lessonId: 'k4-rational', beatId: 's1' },
        { id: 'k4-concepts', title: '有理數與無理數', lessonId: 'k4-rational', beatId: 's2' },
        { id: 'k4-surd', title: '簡單根式運算', lessonId: 'k4-rational', beatId: 's5' },
      ],
    },
    {
      id: 'k5', code: 'K5', title: '百分數的應用', en: 'Using percentages',
      strand: '數與代數', hours: 15,
      units: [
        { id: 'k5-changes', title: '百分數變化', lessonId: 'k5-percent', beatId: 's1' },
        { id: 'k5-life', title: '盈利虧損利息應用', lessonId: 'k5-percent', beatId: 's5' },
      ],
    },
    {
      id: 'k6', code: 'K6', title: '率、比與比例', en: 'Rates, ratios and proportions',
      strand: '數與代數', hours: 8,
      units: [
        { id: 'k6-concepts', title: '率、比與比例概念', lessonId: 'k6-ratio', beatId: 's1' },
        { id: 'k6-problems', title: '應用題', lessonId: 'k6-ratio', beatId: 's6' },
      ],
    },
    {
      id: 'k7', code: 'K7', title: '代數式', en: 'Algebraic expressions',
      strand: '數與代數', hours: 7,
      units: [
        { id: 'k7-phrases', title: '文字短語與代數式互譯', lessonId: 'k7-algebra', beatId: 's2' },
        { id: 'k7-sequences', title: '數列概念', lessonId: 'k7-algebra', beatId: 's5' },
        { id: 'k7-functions', title: '函數初步', lessonId: 'k7-algebra', beatId: 's7' },
      ],
    },
    {
      id: 'k8', code: 'K8', title: '一元一次方程', en: 'Linear equations in one unknown',
      strand: '數與代數', hours: 7,
      units: [
        { id: 'k8-solve', title: '解一元一次方程', lessonId: 'k8-lesson', beatId: 's2' },
        { id: 'k8-formulate', title: '由文字題建立方程', lessonId: 'k8-lesson', beatId: 's5' },
        { id: 'k8-problems', title: '方程應用題', lessonId: 'k8-lesson', beatId: 's6' },
      ],
    },
    {
      id: 'k9', code: 'K9', title: '二元一次聯立方程', en: 'Linear equations in two unknowns',
      strand: '數與代數', hours: 12,
      units: [
        { id: 'k9-concept', title: '聯立方程概念', lessonId: 'k9-lesson', beatId: 's1' },
        { id: 'k9-substitution', title: '代入法與消去法', lessonId: 'k9-lesson', beatId: 's2' },
        { id: 'k9-graphical', title: '圖解法', lessonId: 'k9-lesson', beatId: 's4' },
        { id: 'k9-problems', title: '應用題', lessonId: 'k9-lesson', beatId: 's5' },
      ],
    },
    {
      id: 'k10', code: 'K10', title: '整數指數定律', en: 'Laws of integral indices',
      strand: '數與代數',
      units: [
        { id: 'k10-zero-neg', title: '零指數與負指數', lessonId: 'k10-lesson', beatId: 's1' },
        { id: 'k10-laws', title: '指數定律', lessonId: 'k10-lesson', beatId: 's2' },
        { id: 'k10-sci', title: '科學記數法', lessonId: 'k10-lesson', beatId: 's3' },
        { id: 'k10-binary', title: '二進制與其他進制', lessonId: 'k10-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'k11', code: 'K11', title: '多項式', en: 'Polynomials',
      strand: '數與代數',
      units: [
        { id: 'k11-concept', title: '多項式概念', lessonId: 'k11-lesson', beatId: 's1' },
        { id: 'k11-operations', title: '四則運算', lessonId: 'k11-lesson', beatId: 's2' },
        { id: 'k11-factorise', title: '因式分解', lessonId: 'k11-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'k12', code: 'K12', title: '恆等式', en: 'Identities',
      strand: '數與代數',
      units: [
        { id: 'k12-concept', title: '恆等式概念', lessonId: 'k12-lesson', beatId: 's1' },
        { id: 'k12-expand', title: '用恆等式展開', lessonId: 'k12-lesson', beatId: 's2' },
        { id: 'k12-factorise', title: '用恆等式因式分解', lessonId: 'k12-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'k13', code: 'K13', title: '公式', en: 'Formulae',
      strand: '數與代數',
      units: [
        { id: 'k13-fractions', title: '代數分式運算', lessonId: 'k13-lesson', beatId: 's3' },
        { id: 'k13-substitution', title: '代入求值', lessonId: 'k13-lesson', beatId: 's1' },
        { id: 'k13-subject', title: '主項變換', lessonId: 'k13-lesson', beatId: 's2' },
      ],
    },
    {
      id: 'k14', code: 'K14', title: '一元一次不等式', en: 'Linear inequalities in one unknown',
      strand: '數與代數',
      units: [
        { id: 'k14-concept', title: '不等式概念與性質', lessonId: 'k14-lesson', beatId: 's1' },
        { id: 'k14-solve', title: '解一元一次不等式', lessonId: 'k14-lesson', beatId: 's2' },
        { id: 'k14-problems', title: '應用題', lessonId: 'k14-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'k15', code: 'K15', title: '量度誤差', en: 'Errors in measurement',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k15-errors', title: '誤差概念', lessonId: 'k15-lesson', beatId: 's1' },
        { id: 'k15-max', title: '最大絕對誤差', lessonId: 'k15-lesson', beatId: 's2' },
        { id: 'k15-problems', title: '誤差應用題', lessonId: 'k15-lesson', beatId: 's3' },
      ],
    },
    {
      id: 'k16', code: 'K16', title: '弧長與扇形面積', en: 'Arc lengths and areas of sectors',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k16-arc', title: '弧長公式', lessonId: 'k16-lesson', beatId: 's1' },
        { id: 'k16-sector', title: '扇形面積公式', lessonId: 'k16-lesson', beatId: 's2' },
        { id: 'k16-problems', title: '應用題', lessonId: 'k16-lesson', beatId: 's3' },
      ],
    },
    {
      id: 'k17', code: 'K17', title: '立體圖形', en: '3-D figures',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k17-prisms', title: '角柱體、圓柱體、角錐體概念', lessonId: 'k17-lesson', beatId: 's1' },
        { id: 'k17-sketch', title: '立體圖形素描與平面摺圖', lessonId: 'k17-lesson', beatId: 's2' },
      ],
    },
    {
      id: 'k18', code: 'K18', title: '求積法', en: 'Mensuration',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k18-volumes', title: '柱體錐體體積公式', lessonId: 'k18-lesson', beatId: 's1' },
        { id: 'k18-surface', title: '表面積', lessonId: 'k18-lesson', beatId: 's3' },
        { id: 'k18-relations', title: '長度、面積與體積關係', lessonId: 'k18-lesson', beatId: 's4' },
        { id: 'k18-problems', title: '應用題', lessonId: 'k18-lesson', beatId: 's2' },
      ],
    },
    {
      id: 'k19', code: 'K19', title: '角與平行線', en: 'Angles and parallel lines',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k19-concepts', title: '同位角、內錯角等概念', lessonId: 'k19-lesson', beatId: 's1' },
        { id: 'k19-conditions', title: '平行線判別條件', lessonId: 'k19-lesson', beatId: 's2' },
        { id: 'k19-properties', title: '角性質應用', lessonId: 'k19-lesson', beatId: 's3' },
      ],
    },
    {
      id: 'k20', code: 'K20', title: '多邊形', en: 'Polygons',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k20-regular', title: '正多邊形', lessonId: 'k20-lesson', beatId: 's1' },
        { id: 'k20-angles', title: '內角和與外角和公式', lessonId: 'k20-lesson', beatId: 's2' },
        { id: 'k20-tiling', title: '多邊形鋪砌', lessonId: 'k20-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'k21', code: 'K21', title: '全等三角形', en: 'Congruent triangles',
      strand: '度量、圖形與空間',
      units: [
        { id: 'congruence', title: '全等概念與全等條件', lessonId: 'k21-lesson', beatId: 's2' },
        { id: 'k21-isosceles', title: '等腰三角形', lessonId: 'k21-lesson', beatId: 's3' },
        { id: 'k21-construct', title: '角平分線與垂直平分線作圖', lessonId: 'k24-lesson', beatId: 's1' },
      ],
    },
    {
      id: 'k22', code: 'K22', title: '相似三角形', en: 'Similar triangles',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k22-concept', title: '相似概念與條件', lessonId: 'k22-lesson', beatId: 's1' },
        { id: 'k22-figures', title: '相似 2D 圖形', lessonId: 'k22-lesson', beatId: 's2' },
      ],
    },
    {
      id: 'k23', code: 'K23', title: '四邊形', en: 'Quadrilaterals',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k23-parallelogram', title: '平行四邊形性質與判別', lessonId: 'k23-lesson', beatId: 's1' },
        { id: 'k23-special', title: '菱形、長方形、正方形', lessonId: 'k23-lesson', beatId: 's2' },
        { id: 'k23-midpoint', title: '中點定理與截線定理', lessonId: 'k23-lesson', beatId: 's3' },
      ],
    },
    {
      id: 'k24', code: 'K24', title: '三角形的心', en: 'Centres of triangles',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k24-bisectors', title: '角平分線與垂直平分線性質', lessonId: 'k24-lesson', beatId: 's1' },
        { id: 'k24-concurrence', title: '三心共點：重心、垂心、外心、內心', lessonId: 'k24-lesson', beatId: 's2' },
      ],
    },
    {
      id: 'k25', code: 'K25', title: '畢氏定理', en: 'Pythagoras’ theorem',
      strand: '度量、圖形與空間',
      units: [
        { id: 'pythagoras', title: '畢氏定理視覺證明', lessonId: 'pythagoras-vis', beatId: 's1' },
        { id: 'k25-converse', title: '畢氏定理逆定理', lessonId: 'k25m-lesson', beatId: 's1' },
        { id: 'k25-problems', title: '應用題', lessonId: 'k25m-lesson', beatId: 's3' },
        { id: 'k25-triples', title: '勾股數探究', lessonId: 'k25m-lesson', beatId: 's2' },
      ],
    },
    {
      id: 'k26', code: 'K26', title: '直角坐標系', en: 'Rectangular coordinate system',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k26-system', title: '直角坐標系', lessonId: 'k26-lesson', beatId: 's1' },
        { id: 'k26-distance', title: '兩點距離與距離公式', lessonId: 'k26-lesson', beatId: 's2' },
        { id: 'k26-areas', title: '坐標圖形面積', lessonId: 'k26-lesson', beatId: 's5' },
        { id: 'k26-transform', title: '變換對點嘅影響', lessonId: 'k26-lesson', beatId: 's4' },
        { id: 'k26-midpoint', title: '中點公式', lessonId: 'k26-lesson', beatId: 's3' },
      ],
    },
    {
      id: 'k27', code: 'K27', title: '三角比', en: 'Trigonometry',
      strand: '度量、圖形與空間',
      units: [
        { id: 'k27-ratios', title: '正弦、餘弦、正切', lessonId: 'k27-lesson', beatId: 's1' },
        { id: 'k27-exact', title: '特殊角準確值', lessonId: 'k27-lesson', beatId: 's2' },
        { id: 'k27-figures', title: '平面圖形應用', lessonId: 'k27-lesson', beatId: 's4' },
        { id: 'k27-angles', title: '仰角、俯角與方位角', lessonId: 'k27-lesson', beatId: 's3' },
      ],
    },
    {
      id: 'k28', code: 'K28', title: '數據整理', en: 'Organisation of data',
      strand: '數據處理',
      units: [
        { id: 'k28-discrete', title: '離散與連續數據', lessonId: 'k28-lesson', beatId: 's1' },
        { id: 'k28-grouping', title: '不分組與分組整理', lessonId: 'k28-lesson', beatId: 's2' },
      ],
    },
    {
      id: 'k29', code: 'K29', title: '數據表達', en: 'Presentation of data',
      strand: '數據處理',
      units: [
        { id: 'k29-stem', title: '幹葉圖與直方圖', lessonId: 'k29-lesson', beatId: 's1' },
        { id: 'k29-frequency', title: '頻數多邊形與曲線', lessonId: 'k29-lesson', beatId: 's2' },
        { id: 'k29-choose', title: '選擇合適統計圖表', lessonId: 'k29-lesson', beatId: 's3' },
      ],
    },
    {
      id: 'k30', code: 'K30', title: '集中趨勢的量度', en: 'Measures of central tendency',
      strand: '數據處理',
      units: [
        { id: 'k30-mean-median-mode', title: '平均數、中位數、眾數', lessonId: 'k30-lesson', beatId: 's1' },
        { id: 'k30-grouped', title: '分組數據與模態組', lessonId: 'k30-lesson', beatId: 's2' },
        { id: 'k30-weighted', title: '加權平均數', lessonId: 'k30-lesson', beatId: 's3' },
        { id: 'k30-abuses', title: '應用與誤用', lessonId: 'k30-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'k31', code: 'K31', title: '概率', en: 'Probability',
      strand: '數據處理',
      units: [
        { id: 'k31-concept', title: '概率概念', lessonId: 'k31-lesson', beatId: 's1' },
        { id: 'k31-listing', title: '列舉法計算概率', lessonId: 'k31-lesson', beatId: 's2' },
        { id: 'k31-expectation', title: '期望值', lessonId: 'k31-lesson', beatId: 's3' },
        { id: 'k31-problems', title: '應用題', lessonId: 'k31-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'k32', code: 'K32', title: '探究與調查', en: 'Inquiry and investigation',
      strand: '延伸學習',
      units: [
        { id: 'k32-inquiry', title: '數學探究專題', lessonId: 'k32-lesson', beatId: 's1' },
      ],
    },
  ],
  DSE: [
    {
      id: 'lu1',
      code: 'U1',
      title: '一元二次方程',
      en: 'Quadratic equations in one unknown',
      hours: 19,
      units: [
        { id: 'u1-concept', title: '標準形（總結 P8）', lessonId: 'u1-lesson', beatId: 's1' },
        { id: 'u1-factor', title: '因式法', lessonId: 'u1-lesson', beatId: 's2' },
        { id: 'u1-complete', title: '配方法', lessonId: 'u1-lesson', beatId: 's3' },
        { id: 'u1-formula', title: '求根公式', lessonId: 'u1-lesson', beatId: 's4' },
        { id: 'u1-discriminant', title: '根的數目 Δ', lessonId: 'u1-lesson', beatId: 's5' },
        { id: 'u1-build', title: '由已知根建方程', lessonId: 'u1-lesson', beatId: 's6' },
        { id: 'u1-coefficients', title: '根與係數', lessonId: 'u1-lesson', beatId: 's7' },
        { id: 'u1-squares', title: 'α²+β² 恆等式', lessonId: 'u1-lesson', beatId: 's8' },
        { id: 'u1-complex', title: '複數運算', lessonId: 'u1-lesson', beatId: 's9' },
        { id: 'u1-complex-build', title: '複數根建方程', lessonId: 'u1-lesson', beatId: 's10' },
        { id: 'u1-mistakes', title: '常見錯對照', lessonId: 'u1-lesson', beatId: 's11' },
        { id: 'u1-apply', title: '應用練習', lessonId: 'u1-lesson', beatId: 's12' },
      ],
    },
    {
      id: 'lu2',
      code: 'U2',
      title: '函數及其圖像',
      en: 'Functions and graphs',
      hours: 10,
      units: [
        { id: 'u2-concept', title: '函數概念', lessonId: 'u2-lesson', beatId: 's1' },
        { id: 'u2-notation', title: '記法與定義域', lessonId: 'u2-lesson', beatId: 's2' },
        { id: 'u2-quadratic', title: '二次函數標準形', lessonId: 'u2-lesson', beatId: 's3' },
        { id: 'u2-features', title: '圖像四招（MC）', lessonId: 'u2-lesson', beatId: 's4' },
        { id: 'u2-vertex', title: '頂點與對稱軸', lessonId: 'u2-lesson', beatId: 's5' },
        { id: 'u2-disc', title: 'Δ 與 x 軸交點', lessonId: 'u2-lesson', beatId: 's6' },
        { id: 'u2-complete', title: '配方法與頂點式', lessonId: 'u2-lesson', beatId: 's7' },
        { id: 'u2-maxmin', title: '極大值與極小值', lessonId: 'u2-lesson', beatId: 's8' },
        { id: 'u2-mistakes', title: '常見錯對照', lessonId: 'u2-lesson', beatId: 's9' },
        { id: 'u2-apply', title: '應用練習', lessonId: 'u2-lesson', beatId: 's10' },
      ],
    },
    {
      id: 'lu3',
      code: 'U3',
      title: '指數函數與對數函數',
      en: 'Exponential and logarithmic functions',
      hours: 16,
      units: [
        { id: 'u3-concept', title: '指數與對數互為反面', lessonId: 'u3-lesson', beatId: 's1' },
        { id: 'u3-laws', title: '指數定律', lessonId: 'u3-lesson', beatId: 's2' },
        { id: 'u3-indices', title: '有理指數', lessonId: 'u3-lesson', beatId: 's3' },
        { id: 'u3-surd', title: '根式化簡', lessonId: 'u3-lesson', beatId: 's4' },
        { id: 'u3-log', title: '對數性質與換底', lessonId: 'u3-lesson', beatId: 's5' },
        { id: 'u3-graphs', title: '指數／對數圖像', lessonId: 'u3-lesson', beatId: 's6' },
        { id: 'u3-eqns', title: '指數方程與對數方程', lessonId: 'u3-lesson', beatId: 's7' },
        { id: 'u3-mistakes', title: '常見錯對照', lessonId: 'u3-lesson', beatId: 's8' },
        { id: 'u3-life', title: '現實生活應用', lessonId: 'u3-lesson', beatId: 's9' },
      ],
    },
    {
      id: 'lu4',
      code: 'U4',
      title: '多項式的進一步認識',
      en: 'More about polynomials',
      hours: 14,
      units: [
        { id: 'u4-concept', title: '多項式再進一步', lessonId: 'u4-lesson', beatId: 's1' },
        { id: 'u4-division', title: '多項式除法', lessonId: 'u4-lesson', beatId: 's2' },
        { id: 'u4-remainder', title: '餘式定理', lessonId: 'u4-lesson', beatId: 's3' },
        { id: 'u4-factor', title: '因式定理', lessonId: 'u4-lesson', beatId: 's4' },
        { id: 'u4-gcd', title: 'HCF 與 LCM', lessonId: 'u4-lesson', beatId: 's5' },
        { id: 'u4-rational', title: '有理式加減', lessonId: 'u4-lesson', beatId: 's6' },
        { id: 'u4-mistakes', title: '常見錯對照', lessonId: 'u4-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu5',
      code: 'U5',
      title: '方程的進一步認識',
      en: 'More about equations',
      hours: 10,
      units: [
        { id: 'u5-concept', title: '聯立同可化二次', lessonId: 'u5-lesson', beatId: 's1' },
        { id: 'u5-graphical', title: '圖解聯立方程', lessonId: 'u5-lesson', beatId: 's2' },
        { id: 'u5-algebraic', title: '代數法解聯立方程', lessonId: 'u5-lesson', beatId: 's3' },
        { id: 'u5-disc', title: 'Δ 與交點個數', lessonId: 'u5-lesson', beatId: 's4' },
        { id: 'u5-reduce', title: '可化為二次方程嘅方程', lessonId: 'u5-lesson', beatId: 's5' },
        { id: 'u5-mistakes', title: '常見錯對照', lessonId: 'u5-lesson', beatId: 's6' },
        { id: 'u5-problems', title: '方程應用題', lessonId: 'u5-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu6',
      code: 'U6',
      title: '變異',
      en: 'Variations',
      hours: 7,
      units: [
        { id: 'u6-concept', title: '變異概念', lessonId: 'u6-lesson', beatId: 's1' },
        { id: 'u6-direct', title: '正變', lessonId: 'u6-lesson', beatId: 's2' },
        { id: 'u6-inverse', title: '反變', lessonId: 'u6-lesson', beatId: 's3' },
        { id: 'u6-joint', title: '聯變', lessonId: 'u6-lesson', beatId: 's4' },
        { id: 'u6-partial', title: '部分變', lessonId: 'u6-lesson', beatId: 's5' },
        { id: 'u6-apply', title: '應用求 k', lessonId: 'u6-lesson', beatId: 's6' },
        { id: 'u6-mistakes', title: '常見錯對照', lessonId: 'u6-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu7',
      code: 'U7',
      title: '等差與等比數列及其求和',
      en: 'Arithmetic and geometric sequences and their summations',
      hours: 17,
      units: [
        { id: 'u7-concept', title: '數列概念', lessonId: 'u7-lesson', beatId: 's1' },
        { id: 'u7-ap', title: '等差數列', lessonId: 'u7-lesson', beatId: 's2' },
        { id: 'u7-gp', title: '等比數列', lessonId: 'u7-lesson', beatId: 's3' },
        { id: 'u7-sum-ap', title: 'AP 求和', lessonId: 'u7-lesson', beatId: 's4' },
        { id: 'u7-sum-gp', title: 'GP 求和', lessonId: 'u7-lesson', beatId: 's5' },
        { id: 'u7-infinity', title: '無窮求和', lessonId: 'u7-lesson', beatId: 's6' },
        { id: 'u7-mistakes', title: '常見錯對照', lessonId: 'u7-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu8',
      code: 'U8',
      title: '不等式與線性規劃',
      en: 'Inequalities and linear programming',
      hours: 16,
      units: [
        { id: 'u8-concept', title: '不等式入門', lessonId: 'u8-lesson', beatId: 's1' },
        { id: 'u8-compound', title: '複合不等式', lessonId: 'u8-lesson', beatId: 's2' },
        { id: 'u8-quadratic', title: '二次不等式', lessonId: 'u8-lesson', beatId: 's3' },
        { id: 'u8-two-var', title: '二元線性不等式', lessonId: 'u8-lesson', beatId: 's4' },
        { id: 'u8-lp', title: '線性規劃', lessonId: 'u8-lesson', beatId: 's5' },
        { id: 'u8-apply', title: '規劃應用', lessonId: 'u8-lesson', beatId: 's6' },
        { id: 'u8-mistakes', title: '常見錯對照', lessonId: 'u8-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu9',
      code: 'U9',
      title: '函數圖像的進一步認識',
      en: 'More about graphs of functions',
      hours: 11,
      units: [
        { id: 'u9-sketch', title: '圖像素描', lessonId: 'u9-lesson', beatId: 's1' },
        { id: 'u9-eqk', title: '圖解 f(x)=k', lessonId: 'u9-lesson', beatId: 's2' },
        { id: 'u9-ineq', title: '圖解不等式', lessonId: 'u9-lesson', beatId: 's3' },
        { id: 'u9-translate', title: '平移變換', lessonId: 'u9-lesson', beatId: 's4' },
        { id: 'u9-reflect', title: '反射變換', lessonId: 'u9-lesson', beatId: 's5' },
        { id: 'u9-stretch', title: '放大縮小', lessonId: 'u9-lesson', beatId: 's6' },
        { id: 'u9-mistakes', title: '常見錯對照', lessonId: 'u9-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu10',
      code: 'U10',
      title: '直線方程',
      en: 'Equations of straight lines',
      units: [
        { id: 'u10-concept', title: '直線方程概念', lessonId: 'u10-lesson', beatId: 's1' },
        { id: 'u10-forms', title: '三種寫法', lessonId: 'u10-lesson', beatId: 's2' },
        { id: 'u10-slope', title: '斜率與截距', lessonId: 'u10-lesson', beatId: 's3' },
        { id: 'u10-parallel', title: '平行與垂直', lessonId: 'u10-lesson', beatId: 's4' },
        { id: 'u10-intersect', title: '兩線交點', lessonId: 'u10-lesson', beatId: 's5' },
        { id: 'u10-distance', title: '點線距', lessonId: 'u10-lesson', beatId: 's6' },
        { id: 'u10-mistakes', title: '常見錯對照', lessonId: 'u10-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu11',
      code: 'U11',
      title: '圓的基本性質',
      en: 'Basic properties of circles',
      units: [
        { id: 'u11-concept', title: '圓性質概覽', lessonId: 'u11-lesson', beatId: 's1' },
        { id: 'u11-chords', title: '弦與弧', lessonId: 'u11-lesson', beatId: 's2' },
        { id: 'u11-angles', title: '圓角性質', lessonId: 'u11-lesson', beatId: 's3' },
        { id: 'u11-cyclic', title: '圓內接四邊形', lessonId: 'u11-lesson', beatId: 's4' },
        { id: 'u11-tangents', title: '切線性質', lessonId: 'u11-lesson', beatId: 's5' },
        { id: 'u11-concyclic', title: '共圓檢驗', lessonId: 'u11-lesson', beatId: 's6' },
        { id: 'u11-mistakes', title: '常見錯對照', lessonId: 'u11-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu12',
      code: 'U12',
      title: '軌跡',
      en: 'Loci',
      units: [
        { id: 'u12-concept', title: '軌跡概念', lessonId: 'u12-lesson', beatId: 's1' },
        { id: 'u12-circle', title: '定距一點', lessonId: 'u12-lesson', beatId: 's2' },
        { id: 'u12-perp', title: '等距兩點', lessonId: 'u12-lesson', beatId: 's3' },
        { id: 'u12-angle', title: '等距兩線', lessonId: 'u12-lesson', beatId: 's4' },
        { id: 'u12-algebra', title: '代數求方程', lessonId: 'u12-lesson', beatId: 's5' },
        { id: 'u12-mistakes', title: '常見錯對照', lessonId: 'u12-lesson', beatId: 's6' },
      ],
    },
    {
      id: 'lu13',
      code: 'U13',
      title: '圓的方程',
      en: 'Equations of circles',
      units: [
        { id: 'u13-concept', title: '圓的標準方程', lessonId: 'u13-lesson', beatId: 's1' },
        { id: 'u13-general', title: '一般式', lessonId: 'u13-lesson', beatId: 's2' },
        { id: 'u13-convert', title: '標準與一般互換', lessonId: 'u13-lesson', beatId: 's3' },
        { id: 'u13-intersect', title: '直線與圓', lessonId: 'u13-lesson', beatId: 's4' },
        { id: 'u13-apply', title: '應用求圓', lessonId: 'u13-lesson', beatId: 's5' },
        { id: 'u13-mistakes', title: '常見錯對照', lessonId: 'u13-lesson', beatId: 's6' },
      ],
    },
    {
      id: 'lu14',
      code: 'U14',
      title: '三角學的進一步認識',
      en: 'More about trigonometry',
      hours: 12,
      units: [
        { id: 'u14-concept', title: '三角進一步概覽', lessonId: 'u14-lesson', beatId: 's1' },
        { id: 'u14-sine', title: '正弦公式', lessonId: 'u14-lesson', beatId: 's2' },
        { id: 'u14-cosine', title: '餘弦公式', lessonId: 'u14-lesson', beatId: 's3' },
        { id: 'u14-area', title: '面積與希羅', lessonId: 'u14-lesson', beatId: 's4' },
        { id: 'u14-equations', title: '三角方程', lessonId: 'u14-lesson', beatId: 's5' },
        { id: 'u14-projection', title: '投影與三垂線', lessonId: 'u14-lesson', beatId: 's6' },
        { id: 'u14-mistakes', title: '常見錯對照', lessonId: 'u14-lesson', beatId: 's7' },
        { id: '3d-trig', title: '立體三角學應用（Q18）', lessonId: 'dse-2012-p1-q18', beatId: 'p0' },
      ],
    },
    {
      id: 'lu15',
      code: 'U15',
      title: '排列與組合',
      en: 'Permutations and combinations',
      units: [
        { id: 'u15-concept', title: '排列與組合分別', lessonId: 'u15-lesson', beatId: 's1' },
        { id: 'u15-rules', title: '加法與乘法規則', lessonId: 'u15-lesson', beatId: 's2' },
        { id: 'u15-perm', title: '排列 nPr', lessonId: 'u15-lesson', beatId: 's3' },
        { id: 'u15-comb', title: '組合 nCr', lessonId: 'u15-lesson', beatId: 's4' },
        { id: 'u15-link', title: 'P 與 C 關係', lessonId: 'u15-lesson', beatId: 's5' },
        { id: 'u15-apply', title: '應用練習', lessonId: 'u15-lesson', beatId: 's6' },
        { id: 'u15-mistakes', title: '常見錯對照', lessonId: 'u15-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu16',
      code: 'U16',
      title: '概率的進一步認識',
      en: 'More about probability',
      units: [
        { id: 'u16-concept', title: '概率進一步概覽', lessonId: 'u16-lesson', beatId: 's1' },
        { id: 'u16-sets', title: '集合語言', lessonId: 'u16-lesson', beatId: 's2' },
        { id: 'u16-addition', title: '加法定律', lessonId: 'u16-lesson', beatId: 's3' },
        { id: 'u16-mult', title: '乘法與條件概率', lessonId: 'u16-lesson', beatId: 's4' },
        { id: 'u16-tree', title: '樹形圖', lessonId: 'u16-lesson', beatId: 's5' },
        { id: 'u16-pnc', title: '排列組合計概率', lessonId: 'u16-lesson', beatId: 's6' },
        { id: 'u16-mistakes', title: '常見錯對照', lessonId: 'u16-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu17',
      code: 'U17',
      title: '離差的量度',
      en: 'Measures of dispersion',
      units: [
        { id: 'u17-concept', title: '離差概念', lessonId: 'u17-lesson', beatId: 's1' },
        { id: 'u17-range', title: '分佈域', lessonId: 'u17-lesson', beatId: 's2' },
        { id: 'u17-iqr', title: '四分位數間距', lessonId: 'u17-lesson', beatId: 's3' },
        { id: 'u17-box', title: '箱形圖', lessonId: 'u17-lesson', beatId: 's4' },
        { id: 'u17-sd', title: '標準差', lessonId: 'u17-lesson', beatId: 's5' },
        { id: 'u17-apply', title: '比較應用', lessonId: 'u17-lesson', beatId: 's6' },
        { id: 'u17-mistakes', title: '常見錯對照', lessonId: 'u17-lesson', beatId: 's7' },
      ],
    },
    {
      id: 'lu18',
      code: 'U18',
      title: '統計的應用與誤用',
      en: 'Uses and abuses of statistics',
      units: [
        { id: 'u18-concept', title: '應用與誤用概覽', lessonId: 'u18-lesson', beatId: 's1' },
        { id: 'u18-sampling', title: '抽樣方法', lessonId: 'u18-lesson', beatId: 's2' },
        { id: 'u18-abuses', title: '圖像誤導', lessonId: 'u18-lesson', beatId: 's3' },
        { id: 'u18-questions', title: '問題設計', lessonId: 'u18-lesson', beatId: 's4' },
        { id: 'u18-assess', title: '評估三問', lessonId: 'u18-lesson', beatId: 's5' },
        { id: 'u18-mistakes', title: '常見錯對照', lessonId: 'u18-lesson', beatId: 's6' },
      ],
    },
    {
      id: 'lu19',
      code: 'U19',
      title: '進一步應用',
      en: 'Further applications',
      units: [
        { id: 'u19-concept', title: '跨單元應用', lessonId: 'u19-lesson', beatId: 's1' },
        { id: 'u19-model', title: '建模四步', lessonId: 'u19-lesson', beatId: 's2' },
        { id: 'u19-example', title: '極值應用例', lessonId: 'u19-lesson', beatId: 's3' },
        { id: 'u19-mix', title: '三角綜合例', lessonId: 'u19-lesson', beatId: 's4' },
        { id: 'u19-checklist', title: '交卷檢查', lessonId: 'u19-lesson', beatId: 's5' },
      ],
    },
    {
      id: 'lu20',
      code: 'U20',
      title: '探究與調查',
      en: 'Inquiry and investigation',
      units: [
        { id: 'u20-concept', title: '探究概念', lessonId: 'u20-lesson', beatId: 's1' },
        { id: 'u20-steps', title: '探究四步', lessonId: 'u20-lesson', beatId: 's2' },
        { id: 'u20-tools', title: '可用工具', lessonId: 'u20-lesson', beatId: 's3' },
        { id: 'u20-report', title: '點寫報告', lessonId: 'u20-lesson', beatId: 's4' },
      ],
    },
    {
      id: 'm1',
      icon: '📙',
      title: 'M1 微積分與統計',
      units: [
        { id: 'm1-concept', title: 'M1 概覽', lessonId: 'm1-lesson', beatId: 's1' },
        { id: 'm1-binomial', title: '二項式展開', lessonId: 'm1-lesson', beatId: 's2' },
        { id: 'm1-explog', title: 'e 與 ln', lessonId: 'm1-lesson', beatId: 's3' },
        { id: 'm1-diff', title: '微分', lessonId: 'm1-lesson', beatId: 's4' },
        { id: 'm1-int', title: '積分', lessonId: 'm1-lesson', beatId: 's5' },
        { id: 'm1-apply', title: '極值應用', lessonId: 'm1-lesson', beatId: 's6' },
      ],
    },
    {
      id: 'm2',
      icon: '📕',
      title: 'M2 代數與微積分',
      units: [
        { id: 'm2-concept', title: 'M2 概覽', lessonId: 'm2-lesson', beatId: 's1' },
        { id: 'm2-induction', title: '數學歸納法', lessonId: 'm2-lesson', beatId: 's2' },
        { id: 'm2-binomial', title: '二項式定理', lessonId: 'm2-lesson', beatId: 's3' },
        { id: 'm2-limit', title: '極限', lessonId: 'm2-lesson', beatId: 's4' },
        { id: 'm2-matrix', title: '矩陣', lessonId: 'm2-lesson', beatId: 's5' },
        { id: 'm2-vector', title: '向量', lessonId: 'm2-lesson', beatId: 's6' },
      ],
    },
  ],
}

/** 該 mode 嘅預設單元：優先揀有課程嘅第一個，冇就第一個單元 */
export function defaultUnitId(mode) {
  const topics = SYLLABUS[mode]
  for (const t of topics) {
    const withLesson = t.units.find((u) => u.lessonId)
    if (withLesson) return withLesson.id
  }
  return topics[0]?.units[0]?.id ?? null
}
