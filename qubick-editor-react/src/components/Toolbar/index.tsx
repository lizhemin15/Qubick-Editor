import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faUndo,
  faRedo,
  faCopy,
  faPaste,
  faTrash,
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

interface ToolbarProps {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onDelete?: () => void;
  onRun?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onUndo,
  onRedo,
  onCopy,
  onPaste,
  onDelete,
  onRun,
  canUndo = false,
  canRedo = false
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button onClick={onSave} title="保存">
          <FontAwesomeIcon icon={faSave} />
        </button>
      </div>

      <div className="toolbar-group">
        <button onClick={onUndo} disabled={!canUndo} title="撤销">
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button onClick={onRedo} disabled={!canRedo} title="重做">
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>

      <div className="toolbar-group">
        <button onClick={onCopy} title="复制">
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button onClick={onPaste} title="粘贴">
          <FontAwesomeIcon icon={faPaste} />
        </button>
        <button onClick={onDelete} title="删除">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="toolbar-group">
        <button onClick={onRun} className="run-button" title="运行">
          <FontAwesomeIcon icon={faPlay} />
          <span>运行</span>
        </button>
      </div>
    </div>
  );
}; 