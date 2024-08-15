'use client'

interface FilterProps {
  languages: string[]
  selectedLanguage: string
  onLanguageChange: (language: string) => void
  onStarCountChange: (count: string) => void
}

const Filter = ({ languages, selectedLanguage, onLanguageChange, onStarCountChange }: FilterProps) => {
  return (
    <div className="flex gap-4 mb-6 mt-6">
      <select
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <select
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onStarCountChange(e.target.value)}
      >
        <option value="">Stars (Any)</option>
        <option value="1000">&gt; 1000 stars</option>
        <option value="5000">&gt; 5000 stars</option>
        <option value="10000">&gt; 10000 stars</option>
      </select>
    </div>
  )
}

export default Filter
