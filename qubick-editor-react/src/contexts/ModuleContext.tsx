import React, { createContext, useContext, useState, useCallback } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Module {
  id: string;
  name: string;
  icon: IconDefinition;
  description?: string;
  content?: string;
}

interface ModuleContextType {
  modules: Module[];
  selectedModuleId: string | null;
  addModule: (module: Module) => void;
  removeModule: (moduleId: string) => void;
  selectModule: (moduleId: string) => void;
  updateModule: (moduleId: string, updates: Partial<Module>) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const addModule = useCallback((module: Module) => {
    setModules(prev => [...prev, module]);
  }, []);

  const removeModule = useCallback((moduleId: string) => {
    setModules(prev => prev.filter(m => m.id !== moduleId));
    if (selectedModuleId === moduleId) {
      setSelectedModuleId(null);
    }
  }, [selectedModuleId]);

  const selectModule = useCallback((moduleId: string) => {
    setSelectedModuleId(moduleId);
  }, []);

  const updateModule = useCallback((moduleId: string, updates: Partial<Module>) => {
    setModules(prev =>
      prev.map(module =>
        module.id === moduleId ? { ...module, ...updates } : module
      )
    );
  }, []);

  return (
    <ModuleContext.Provider
      value={{
        modules,
        selectedModuleId,
        addModule,
        removeModule,
        selectModule,
        updateModule,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModules = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
}; 