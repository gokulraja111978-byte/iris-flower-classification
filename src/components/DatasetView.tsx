import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Download, ArrowRight, Filter, ChevronLeft, ChevronRight, Check, FileSpreadsheet, CheckCircle2, SlidersHorizontal, X } from 'lucide-react';
import { IRIS_DATASET, IrisSample, SpeciesType, SPECIES_PROFILES, GLOBAL_FEATURE_STATS } from '../data/irisData';
import { FlowerInput } from '../ml/classifier';

interface DatasetViewProps {
  onClassifySample: (sample: FlowerInput) => void;
}

type SortField = 'id' | 'sepalLength' | 'sepalWidth' | 'petalLength' | 'petalWidth' | 'species';
type SortOrder = 'asc' | 'desc';
type CsvFormat = 'standard' | 'detailed';

export const DatasetView: React.FC<DatasetViewProps> = ({ onClassifySample }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<'All' | SpeciesType>('All');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // CSV download state & feedback
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<CsvFormat>('standard');
  const [downloadScope, setDownloadScope] = useState<'all' | 'filtered'>('all');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Filter & Search logic
  const filteredData = useMemo(() => {
    return IRIS_DATASET.filter((item) => {
      // Filter by species
      if (selectedSpecies !== 'All' && item.species !== selectedSpecies) {
        return false;
      }
      // Search term
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        item.id.toString().includes(term) ||
        item.species.toLowerCase().includes(term) ||
        item.sepalLength.toString().includes(term) ||
        item.sepalWidth.toString().includes(term) ||
        item.petalLength.toString().includes(term) ||
        item.petalWidth.toString().includes(term)
      );
    });
  }, [searchTerm, selectedSpecies]);

  // Sort logic
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? (valA as string).localeCompare(valB as string)
          : (valB as string).localeCompare(valA as string);
      } else {
        return sortOrder === 'asc'
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      }
    });
  }, [filteredData, sortField, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // CSV Export with multi-format and scope selection
  const handleDownloadCSV = (
    scope: 'all' | 'filtered' = downloadScope,
    format: CsvFormat = downloadFormat
  ) => {
    const dataToExport = scope === 'filtered' ? filteredData : IRIS_DATASET;
    
    let header: string[];
    let rows: (string | number)[][];

    if (format === 'standard') {
      header = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species'];
      rows = dataToExport.map(d => [
        d.sepalLength,
        d.sepalWidth,
        d.petalLength,
        d.petalWidth,
        `Iris-${d.species.toLowerCase()}`
      ]);
    } else {
      header = [
        'id',
        'sepal_length_cm',
        'sepal_width_cm',
        'petal_length_cm',
        'petal_width_cm',
        'species',
        'scientific_name'
      ];
      rows = dataToExport.map(d => [
        d.id,
        d.sepalLength,
        d.sepalWidth,
        d.petalLength,
        d.petalWidth,
        d.species,
        `"${SPECIES_PROFILES[d.species].scientificName}"`
      ]);
    }

    const csvRows = [header.join(','), ...rows.map(r => r.join(','))];
    const csvContent = csvRows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const fileName =
      scope === 'filtered' && selectedSpecies !== 'All'
        ? `iris_${selectedSpecies.toLowerCase()}_${dataToExport.length}_samples.csv`
        : scope === 'filtered' && searchTerm.trim()
        ? `iris_search_results_${dataToExport.length}_samples.csv`
        : `iris_dataset_150_samples.csv`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadModalOpen(false);
    setDownloadSuccessToast(`Successfully downloaded "${fileName}" (${dataToExport.length} rows, ${(blob.size / 1024).toFixed(1)} KB)`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4500);
  };

  const handleTestInModel = (sample: IrisSample) => {
    setCopiedId(sample.id);
    setTimeout(() => setCopiedId(null), 1500);
    onClassifySample({
      sepalLength: sample.sepalLength,
      sepalWidth: sample.sepalWidth,
      petalLength: sample.petalLength,
      petalWidth: sample.petalWidth
    });
  };

  // Preview rows for modal
  const previewSample = filteredData.length > 0 ? filteredData[0] : IRIS_DATASET[0];

  return (
    <div className="space-y-8 py-6 sm:py-8 max-w-7xl mx-auto relative">
      {/* Toast Notification for Download Confirmation */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-3 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadSuccessToast}</span>
          <button
            onClick={() => setDownloadSuccessToast(null)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header with Prominent Download Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-indigo-600 font-medium">EMPIRICAL BENCHMARK DATASET</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Iris Dataset Explorer
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            The canonical 150 observations recorded by botanist Edgar Anderson in 1935 and introduced to machine learning by Ronald Fisher in 1936.
            Search, filter, sort, test in the classification model, or export as CSV.
          </p>
        </div>

        {/* Primary Header Download Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleDownloadCSV('all', 'standard')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            title="Download full 150-sample Iris dataset as standard CSV"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV (150 Samples)</span>
          </button>

          <button
            type="button"
            onClick={() => setDownloadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Configure CSV download options"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Options</span>
          </button>
        </div>
      </div>

      {/* Dataset Statistics (Required by prompt: Total Samples: 150, Features: 4, Classes: 3) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase">Total Samples</span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
            150
          </div>
          <span className="text-xs text-emerald-600 mt-1 block">Full canonical corpus</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase">Features</span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
            4
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Continuous numeric (cm)</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase">Classes</span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
            3
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Setosa, Versicolor, Virginica</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-mono text-slate-500 uppercase">Class Balance</span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 mt-0.5 tabular-nums">
            50 : 50 : 50
          </div>
          <span className="text-xs text-slate-500 mt-1 block">33.3% equal distribution</span>
        </div>
      </div>

      {/* Summary Feature Statistics Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Dataset Statistical Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Feature</th>
                <th className="py-2.5 px-4 text-right">Min (cm)</th>
                <th className="py-2.5 px-4 text-right">Max (cm)</th>
                <th className="py-2.5 px-4 text-right">Mean ± Std (cm)</th>
                <th className="py-2.5 px-4 text-right">Median (cm)</th>
                <th className="py-2.5 px-4 text-right">Setosa Mean</th>
                <th className="py-2.5 px-4 text-right">Versicolor Mean</th>
                <th className="py-2.5 px-4 text-right">Virginica Mean</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr>
                <td className="py-2 px-4 font-sans font-medium text-slate-900">Sepal Length</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalLength.min}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalLength.max}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalLength.mean} ± {GLOBAL_FEATURE_STATS.sepalLength.std}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalLength.median}</td>
                <td className="py-2 px-4 text-right tabular-nums text-emerald-700">{SPECIES_PROFILES.Setosa.sepalLength.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-blue-700">{SPECIES_PROFILES.Versicolor.sepalLength.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-purple-700">{SPECIES_PROFILES.Virginica.sepalLength.mean}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-sans font-medium text-slate-900">Sepal Width</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalWidth.min}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalWidth.max}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalWidth.mean} ± {GLOBAL_FEATURE_STATS.sepalWidth.std}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.sepalWidth.median}</td>
                <td className="py-2 px-4 text-right tabular-nums text-emerald-700">{SPECIES_PROFILES.Setosa.sepalWidth.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-blue-700">{SPECIES_PROFILES.Versicolor.sepalWidth.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-purple-700">{SPECIES_PROFILES.Virginica.sepalWidth.mean}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-sans font-medium text-slate-900">Petal Length</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalLength.min}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalLength.max}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalLength.mean} ± {GLOBAL_FEATURE_STATS.petalLength.std}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalLength.median}</td>
                <td className="py-2 px-4 text-right tabular-nums text-emerald-700">{SPECIES_PROFILES.Setosa.petalLength.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-blue-700">{SPECIES_PROFILES.Versicolor.petalLength.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-purple-700">{SPECIES_PROFILES.Virginica.petalLength.mean}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-sans font-medium text-slate-900">Petal Width</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalWidth.min}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalWidth.max}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalWidth.mean} ± {GLOBAL_FEATURE_STATS.petalWidth.std}</td>
                <td className="py-2 px-4 text-right tabular-nums">{GLOBAL_FEATURE_STATS.petalWidth.median}</td>
                <td className="py-2 px-4 text-right tabular-nums text-emerald-700">{SPECIES_PROFILES.Setosa.petalWidth.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-blue-700">{SPECIES_PROFILES.Versicolor.petalWidth.mean}</td>
                <td className="py-2 px-4 text-right tabular-nums text-purple-700">{SPECIES_PROFILES.Virginica.petalWidth.mean}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Controls & Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {/* Controls Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ID, species, measurement..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          {/* Filter tabs & actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Species Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'Setosa', 'Versicolor', 'Virginica'] as const).map((sp) => (
                <button
                  key={sp}
                  onClick={() => {
                    setSelectedSpecies(sp);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedSpecies === sp
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sp}
                </button>
              ))}
            </div>

            {/* Export CSV button */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleDownloadCSV(selectedSpecies !== 'All' || searchTerm.trim() ? 'filtered' : 'all', 'standard')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                title="Download CSV"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  Export CSV {selectedSpecies !== 'All' || searchTerm.trim() ? `(${filteredData.length})` : '(150)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDownloadModalOpen(true)}
                className="p-1.5 text-xs text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                title="Export Options & Formats"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-mono text-[11px] border-b border-slate-200">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('sepalLength')}
                  className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Sepal Length (cm)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('sepalWidth')}
                  className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Sepal Width (cm)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('petalLength')}
                  className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Petal Length (cm)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('petalWidth')}
                  className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Petal Width (cm)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('species')}
                  className="py-2.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Species</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-sans text-xs">
                    No Iris records match your search query.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 px-4 text-slate-500">#{item.id}</td>
                    <td className="py-2 px-4 tabular-nums text-slate-800">{item.sepalLength.toFixed(1)}</td>
                    <td className="py-2 px-4 tabular-nums text-slate-800">{item.sepalWidth.toFixed(1)}</td>
                    <td className="py-2 px-4 tabular-nums text-slate-800">{item.petalLength.toFixed(1)}</td>
                    <td className="py-2 px-4 tabular-nums text-slate-800">{item.petalWidth.toFixed(1)}</td>
                    <td className="py-2 px-4 font-sans font-medium text-slate-900">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${SPECIES_PROFILES[item.species].dotColor}`} />
                        <span>Iris {item.species}</span>
                      </span>
                    </td>
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => handleTestInModel(item)}
                        className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                        title="Load this sample into the classification model"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Loaded</span>
                          </>
                        ) : (
                          <>
                            <span>Test</span>
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-50/70 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-mono"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={150}>150 (All)</option>
            </select>
            <span className="text-slate-400 font-mono">
              Showing {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–
              {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-xs">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CSV Export Configuration Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Download Iris Dataset (CSV)</h3>
                  <p className="text-xs text-slate-500">Configure export parameters & file structure</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scope Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                1. Select Dataset Scope
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDownloadScope('all')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    downloadScope === 'all'
                      ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-400/30'
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Complete Dataset</span>
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                      150 rows
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    All 150 historical observations (50 Setosa, 50 Versicolor, 50 Virginica).
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDownloadScope('filtered')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    downloadScope === 'filtered'
                      ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-400/30'
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Current View</span>
                    <span className="text-[10px] font-mono text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                      {filteredData.length} rows
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {selectedSpecies !== 'All' ? `Only ${selectedSpecies}` : 'Current search filter'}.
                  </p>
                </button>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                2. Select CSV Schema Format
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDownloadFormat('standard')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    downloadFormat === 'standard'
                      ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-400/30'
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">Standard ML / Kaggle</span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    sepal_length, sepal_width, petal_length, petal_width, species
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDownloadFormat('detailed')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    downloadFormat === 'detailed'
                      ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-400/30'
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">Detailed Botanical</span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    id, sepal_length_cm, ..., species, scientific_name
                  </span>
                </button>
              </div>
            </div>

            {/* Live CSV Preview Box */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                CSV Data Preview (Header + Row 1):
              </span>
              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                {downloadFormat === 'standard' ? (
                  <>
                    <div className="text-emerald-400">sepal_length,sepal_width,petal_length,petal_width,species</div>
                    <div className="text-slate-400">{previewSample.sepalLength},{previewSample.sepalWidth},{previewSample.petalLength},{previewSample.petalWidth},Iris-{previewSample.species.toLowerCase()}</div>
                  </>
                ) : (
                  <>
                    <div className="text-emerald-400">id,sepal_length_cm,sepal_width_cm,petal_length_cm,petal_width_cm,species,scientific_name</div>
                    <div className="text-slate-400">{previewSample.id},{previewSample.sepalLength},{previewSample.sepalWidth},{previewSample.petalLength},{previewSample.petalWidth},{previewSample.species},"{SPECIES_PROFILES[previewSample.species].scientificName}"</div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDownloadModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDownloadCSV(downloadScope, downloadFormat)}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>
                  Download CSV ({downloadScope === 'filtered' ? filteredData.length : 150} Rows)
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
