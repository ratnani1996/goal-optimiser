import { useState } from 'react'
import axios from 'axios'
import './index.css'

function App() {
    const [goalInput, setGoalInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!goalInput.trim()) return

        setIsLoading(true)
        setError(null)
        setResult(null)

        try {
            const response = await axios.post('/api/goals/refine', {
                input: goalInput
            })

            if (response.data.success) {
                setResult(response.data.data)
            } else {
                setError('Failed to refine goal. Please try again.')
            }
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.error || 'Something went wrong. Is the AI sleeping?')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="app-container">
            <header>
                <h1>Dream Architect</h1>
                <p className="subtitle">Transform your <span className="highlight">vague wishes</span> into <span className="highlight">concrete realities</span>.</p>
            </header>

            <main>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="goal-input-group">
                            <label htmlFor="goal" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                What do you want to achieve?
                            </label>
                            <textarea
                                id="goal"
                                value={goalInput}
                                onChange={(e) => setGoalInput(e.target.value)}
                                placeholder="e.g. I want to become a better leader, or I want to run a marathon..."
                                disabled={isLoading}
                            />
                        </div>

                        <button type="button" className="primary-btn" disabled={isLoading} onClick={handleSubmit}>
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Crafting Strategy...
                                </>
                            ) : (
                                'Architect My Goal'
                            )}
                        </button>
                    </form>

                    {error && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                            {error}
                        </div>
                    )}
                </div>

                {result && (
                    <div className="result-card glass-panel">
                        <div className="result-header">
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Blueprint Generated</h2>
                            <span className="confidence-badge">
                                {result.confidence_score !== undefined ? `${result.confidence_score * 10}% Confidence` : 'High Confidence'}
                            </span>
                        </div>

                        <div className="refined-goal">
                            {result.refined_goal}
                        </div>

                        {result.key_results && result.key_results.length > 0 && (
                            <div>
                                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    Execution Steps
                                </h3>
                                <ul className="key-results-list">
                                    {result.key_results.map((kr, index) => (
                                        <li key={index}>{kr}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {result.feedback && (
                            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                AI Notes: {result.feedback}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

export default App
