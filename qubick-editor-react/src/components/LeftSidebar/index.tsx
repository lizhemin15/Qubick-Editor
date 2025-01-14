import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, 
  faCodeBranch, 
  faShareAlt, 
  faCloud,
  faFolder,
  faSearch,
  faStar,
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

export const LeftSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [activeModules, setActiveModules] = useState('section1');

  const topTabs = [
    { id: 1, icon: faCog, text: '动作模块' },
    { id: 2, icon: faCodeBranch, text: '动作内子程序' },
    { id: 3, icon: faShareAlt, text: '公共子程序' },
    { id: 4, icon: faCloud, text: '网络共享子程序' }
  ];

  const sideButtons = [
    { id: 'section1', icon: faFolder },
    { id: 'section2', icon: faCog },
    { id: 'section3', icon: faSearch },
    { id: 'section4', icon: faStar },
    { id: 'section5', icon: faHistory }
  ];

  return (
    <div className="left-sidebar">
      <div className="top-tabs">
        {topTabs.map(tab => (
          <div
            key={tab.id}
            className={`top-tab ${activeSection === tab.id ? 'active' : ''}`}
            onClick={() => setActiveSection(tab.id)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            <span>{tab.text}</span>
          </div>
        ))}
      </div>

      <div className="bottom-section">
        <div className="button-sidebar">
          {sideButtons.map(button => (
            <button
              key={button.id}
              className={activeModules === button.id ? 'active' : ''}
              onClick={() => setActiveModules(button.id)}
            >
              <FontAwesomeIcon icon={button.icon} />
            </button>
          ))}
        </div>

        <div className="module-list">
          <input type="text" className="module-filter" placeholder="筛选模块..." />
          <div className="module-items">
            {/* 模块列表将通过 ModuleContext 动态生成 */}
          </div>
        </div>
      </div>
    </div>
  );
}; 