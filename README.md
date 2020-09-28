# techjobs

## Aggregated job sources

### API

| Site           | API        | Scrapable |
| -------------- | ---------- | --------- |
| jobscentral    | Via Adzuna | NA        |
| jobstreet      | Via Adzuna | NA        |
| jobsdb         | Via Adzuna | NA        |
| STjobs         | Via Adzuna | NA        |
| careers.gov.sg | Via Adzuna | NA        |
| monster        | Via Adzuna | NA        |

### Scrape

| Site               | API      | Scrapable |
| ------------------ | -------- | --------- |
| techinasia jobs    | No       | Yes       |
| efinancialcareers  | No       | Yes       |
| stackoverflow      | Yes, RSS | NA        |
| mycareersfuture.sg | Yes      | Yes       |

### To check again

| Site         | API              | Scrapable |
| ------------ | ---------------- | --------- |
| linkedinjobs | Yes, need app ID | NA        |

### Not using

| Site             | API                                    | Scrapable   |
| ---------------- | -------------------------------------- | ----------- |
| startupjobs.asia | No                                     | Maybe later |
| indeed           | Yes, need publisher account, forget it | NA          |
| facebook jobs    | No                                     | No          |
| glassdoor jobs   | Yes, need partner account              | NA          |

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

TODO:

1. jobs count should only return recent jobs - done
2. add stripe payment to form
3. make it AMP friendly - not sure if feasible
4. open up stats to page - done
5. no need to update jobs if there is already data - done
6. get jobs from LinkedIn, Wantedly
7. add "send these to me" option for liked jobs
8. featured should be returned from the query first always - done
9. get jobs from MCF - done
