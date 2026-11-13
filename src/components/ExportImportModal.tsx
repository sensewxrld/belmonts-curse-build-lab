import React, { useState } from 'react';
import { X, Download, Upload, Copy, Check, AlertCircle } from 'lucide-react';
import { exportUserDataJSON, importUserDataJSON } from '../utils/storage';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReload: () => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  onDataReload
}) => {
  const [jsonText, setJsonText] = useState<string>(() => exportUserDataJSON());
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `belmonts-curse-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const success = importUserDataJSON(jsonText);
    if (success) {
      setImportStatus('✓ Dados importados com sucesso!');
      onDataReload();
      setTimeout(() => {
        setImportStatus(null);
        onClose();
      }, 1500);
    } else {
      setImportStatus('✗ Erro: formato JSON inválido. Verifique o conteúdo.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gothic-900 border border-gold-accent/50 rounded-2xl flex flex-col shadow-card-elevated overflow-hidden animate-fadeIn">
        <div className="p-4 border-b border-gothic-border flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-gold-accent" />
            <span>Exportação & Importação de Configurações JSON</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-gothic-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-neutral-300 leading-relaxed">
            Seus dados de inventário desbloqueado, builds personalizadas, favoritos e histórico podem ser exportados ou importados livremente entre dispositivos ou navegadores em formato JSON.
          </p>

          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={10}
            className="w-full p-3 font-mono text-[11px] bg-gothic-950 border border-gothic-border rounded-xl text-neutral-200 focus:outline-none focus:border-gold-accent resize-none"
          />

          {importStatus && (
            <div className={`p-2.5 rounded-lg text-xs font-mono ${
              importStatus.startsWith('✓') ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
            }`}>
              {importStatus}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-gothic-800 hover:bg-gothic-700 text-xs text-neutral-200 border border-neutral-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-gold-accent" />
                <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
              </button>

              <button
                onClick={handleDownloadFile}
                className="px-3 py-1.5 rounded-lg bg-gothic-800 hover:bg-gothic-700 text-xs text-neutral-200 border border-neutral-700 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-gold-accent" />
                <span>Baixar Arquivo .json</span>
              </button>
            </div>

            <button
              onClick={handleImport}
              className="px-4 py-2 rounded-xl bg-blood-800 hover:bg-blood-700 text-white font-bold text-xs uppercase flex items-center gap-1.5 transition-all shadow-blood-glow"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importar Este JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
