# techjobs

## Aggregated job sources

### API

| Site | API | Scrapable | 
| jobscentral | Via Adzuna | NA |
| jobstreet | Via Adzuna | NA |
| jobsdb | Via Adzuna | NA |
| STjobs | Via Adzuna | NA |
| careers.gov.sg | Via Adzuna | NA |
| monster | Via Adzuna | NA |
| mycareersfuture.sg | Via Adzuna | NA |

### Scrape

| Site | API | Scrapable | 
| techinasia jobs | No | Yes |
| efinancialcareers | No | Yes |
| stackoverflow | Yes, RSS | NA |

### To check again

| Site | API | Scrapable | 
| linkedinjobs | Yes, need app ID | NA |

### Not using

| Site | API | Scrapable | 
| startupjobs.asia | No | Maybe later |
| indeed | Yes, need publisher account, forget it | NA |
| facebook jobs | No | No |
| glassdoor jobs | Yes, need partner account | NA |

## Getting Started

1. Ensure you have Postgres installed locally
2. Set the `DATABASE_URL` environment variable, something like this:

```
DATABASE_URL=postgresql://<your_computer_username>@localhost:5432/blitz-example-store
```

3. DB migrate

```
blitz db migrate
```

4. Start the dev server

```
blitz start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
