# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### GitLabMergeRequestDevinReviewSlackMessanger <a name="GitLabMergeRequestDevinReviewSlackMessanger" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger"></a>

#### Initializers <a name="Initializers" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.Initializer"></a>

```typescript
import { GitLabMergeRequestDevinReviewSlackMessanger } from '@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger'

new GitLabMergeRequestDevinReviewSlackMessanger(scope: Construct, id: string, props: GitLabMergeRequestDevinReviewSlackMessangerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.Initializer.parameter.props">props</a></code> | <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessangerProps">GitLabMergeRequestDevinReviewSlackMessangerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.Initializer.parameter.props"></a>

- *Type:* <a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessangerProps">GitLabMergeRequestDevinReviewSlackMessangerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.isConstruct"></a>

```typescript
import { GitLabMergeRequestDevinReviewSlackMessanger } from '@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger'

GitLabMergeRequestDevinReviewSlackMessanger.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessanger.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### GitLabMergeRequestDevinReviewSlackMessangerProps <a name="GitLabMergeRequestDevinReviewSlackMessangerProps" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessangerProps"></a>

#### Initializer <a name="Initializer" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessangerProps.Initializer"></a>

```typescript
import { GitLabMergeRequestDevinReviewSlackMessangerProps } from '@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger'

const gitLabMergeRequestDevinReviewSlackMessangerProps: GitLabMergeRequestDevinReviewSlackMessangerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessangerProps.property.secretName">secretName</a></code> | <code>string</code> | *No description.* |

---

##### `secretName`<sup>Required</sup> <a name="secretName" id="@gammarers/aws-gitlab-merge-request-devin-review-slack-messenger.GitLabMergeRequestDevinReviewSlackMessangerProps.property.secretName"></a>

```typescript
public readonly secretName: string;
```

- *Type:* string

---



