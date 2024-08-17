interface TabViewProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const TabView = ({ activeTab, onTabChange }: TabViewProps) => {
  const tabs = [
    { id: 'search', label: 'Search' },
    { id: 'trending', label: 'Trending' },
    { id: 'recent', label: 'Recently Created' }
  ]

  return (
    <div className="flex gap-4 mb-8 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 -mb-px ${
            activeTab === tab.id
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabView
