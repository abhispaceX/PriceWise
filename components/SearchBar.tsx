'use client'
import { scrapeAndStoreProduct } from '@/lib/actions'
import React, { useState, FormEvent } from 'react'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidAmazonUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname
      return hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')
    } catch (error) {
      return false
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!isValidAmazonUrl(searchTerm)) {
      setError('Please provide a valid Amazon link')
      return
    }

    try {
      setIsLoading(true)
      const product = await scrapeAndStoreProduct(searchTerm)
      console.log('Scraped product:', product)
      // Handle the scraped product data here (e.g., update state, display results)
    } catch (error) {
      console.error('Error scraping product:', error)
      setError('Failed to scrape product. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form className='flex flex-wrap gap-4 mt-14' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Enter product link' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className='searchbar-input'
        />
        <button 
          type='submit' 
          disabled={searchTerm === '' || isLoading} 
          className='searchbar-btn'
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default SearchBar