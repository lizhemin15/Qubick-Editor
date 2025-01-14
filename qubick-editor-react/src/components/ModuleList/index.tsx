import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './styles.css';

interface Module {
  id: string;
  name: string;
  icon: IconDefinition;
  description?: string;
}

interface ModuleListProps {
  modules: Module[];
  onModuleSelect: (moduleId: string) => void;
  selectedModuleId?: string;
  filter?: string;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onModuleSelect,
  selectedModuleId,
  filter = ''
}) => {
  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="module-list-container">
      {filteredModules.map(module => (
        <div
          key={module.id}
          className={`module-item ${selectedModuleId === module.id ? 'selected' : ''}`}
          onClick={() => onModuleSelect(module.id)}
        >
          <FontAwesomeIcon icon={module.icon} className="module-icon" />
          <div className="module-info">
            <div className="module-name">{module.name}</div>
            {module.description && (
              <div className="module-description">{module.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 