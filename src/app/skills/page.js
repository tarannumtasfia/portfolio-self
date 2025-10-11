'use client';

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 pt-20 text-gray-800">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-[#3e0097] mb-10">Skills</h1>

        {/* Special Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#3e0097] mb-4">Special Skills</h2>
          <ul className="space-y-3 list-disc pl-6 text-lg">
            <li><strong>Focus Area:</strong> Frontend development with React.js, Next.js — building responsive and user-friendly web interfaces</li>
            <li><strong>Tech Stack:</strong> React.js, Next.js, Express.js</li>
            <li><strong>Databases:</strong> SQL Server (Query optimization), MongoDB</li>
           <li><strong>Other:</strong> Eager to learn, detail-oriented, meets deadlines</li>

          </ul>
        </div>

        {/* All Skills Table */}
        <div>
          <h2 className="text-2xl font-semibold text-[#3e0097] mb-4">All Skills</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left">
              <thead className="bg-purple-100 text-[#3e0097]">
                <tr>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Technologies / Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                 
                  ['Frontend', 'HTML5, CSS3, Bootstrap, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS'],
                  ['Backend & API', 'Node.js, Express.js'],
                  ['Databases', 'MS SQL Server (T-SQL),MongoDB'],
                  ['Concepts', 'OOP, SOLID, Design Patterns, Data Structures, Algorithms, HTTP'],
                  ['Tools', 'VS Code, GitHub, Postman, Figma'],
                ].map(([category, tools], i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 px-4 border font-medium">{category}</td>
                    <td className="py-2 px-4 border">{tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
