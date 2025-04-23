
const IssueDetails = async ({params}:{params:Promise<{issueId: string}>} ) => {
    const {issueId} = await params
  return (
    <div>
        issue id is {issueId}
    </div>
  )
}

export default IssueDetails