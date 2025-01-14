import React, { useCallback } from 'react';
import { LeftSidebar } from './components/LeftSidebar';
import { Toolbar } from './components/Toolbar';
import { ModuleProvider } from './contexts/ModuleContext';
import './styles/App.css';

const App: React.FC = () => {
  const handleSave = useCallback(() => {
    // TODO: 实现保存功能
    console.log('保存');
  }, []);

  const handleUndo = useCallback(() => {
    // TODO: 实现撤销功能
    console.log('撤销');
  }, []);

  const handleRedo = useCallback(() => {
    // TODO: 实现重做功能
    console.log('重做');
  }, []);

  return (
    <ModuleProvider>
      <div className="app">
        <LeftSidebar />
        <div className="resizer" />
        <div className="app-content">
          <Toolbar
            onSave={handleSave}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={false}
            canRedo={false}
          />
          <div className="main-content">
            <div className="editor-area">
              <div className="editor-workspace">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="editor-cell">
                    {/* 编辑器单元格内容将在这里添加 */}
                  </div>
                ))}
              </div>
            </div>
            <div className="resizer" />
            <div className="right-sidebar">
              {/* 右侧属性面板将在这里添加 */}
            </div>
          </div>
        </div>
      </div>
    </ModuleProvider>
  );
};

export default App;
